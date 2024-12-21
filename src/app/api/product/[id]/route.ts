import { connectDb } from "@/lib/DbConnect";
import {Product} from "@/models/product.models";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

// Configuration for Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Interface for Cloudinary upload results
interface CloudinaryUploadResult {
    public_id: string;
    secure_url: string;
}

// Function to upload image with logo and text to Cloudinary
const uploadImageWithLogoAndText = async (file: File): Promise<CloudinaryUploadResult> => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise<CloudinaryUploadResult>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'next-cloudinary-uploads',
               transformation: [
                {
                    "quality": "auto:best",
                    "fetch_format": "auto"
                },
                {
                    "effect": "sharpen:50"
                },
                {
                    "effect": "brightness:30"
                },
                {
                    "overlay": "neqgwethxryghhmggnvi",
                    "gravity": "south_east",
                    "width": 100,
                    "opacity": 80,
                    "x": 10,
                    "y": 10,
                    "crop": "scale"
                },
                {
                    "overlay": {
                        "font_family": "Poppins",
                        "font_size": 30,
                        "font_weight": "bold",
                        "text": "Unique Store Bd"
                    },
                    "gravity": "center",
                    "color": "#FF0000",
                    "opacity": 80,
                  
                }
            ],
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result as CloudinaryUploadResult);
            }
        );
        uploadStream.end(buffer);
    });
};
// Interface for the Product schema
interface IProduct {
    name?: string;
    sname?: string;
    description?: string;
    category?: string;
    price?: number;
    mprice?: number;
    images?: { url: string; public_id: string }[];
    stock?: number;
    sold?: number;
    video?: string;
    warranty?: string;
    seo?: string;
    tags?: string[];
}

// PATCH request to update product by id
export const PATCH = async (request: NextRequest, context: { params: any }) => {
    const { id } = await context.params;

    if (!id) {
        return NextResponse.json({ error: "Missing product id" }, { status: 400 });
    }

    try {
        const formData = await request.formData();
        const files = formData.getAll('images') as File[];

        // Optional: Delete existing images if requested
        const public_id = request.nextUrl.searchParams.get("public_id");
        if (public_id) {
            await cloudinary.uploader.destroy(public_id);
        }

        let images: { url: string; public_id: string }[] = [];

        if (files.length > 0 && files[0].size > 0) {
            // Upload new images if provided
            const uploadResults = await Promise.all(
                files.map(async (file) => await uploadImageWithLogoAndText(file))
            );

            images = uploadResults.map((result) => ({
                url: result.secure_url,
                public_id: result.public_id,
            }));
        }

        const fields = {
            name: formData.get("name") as string | null,
            sname: formData.get("sname") as string | null,
            description: formData.get("description") as string | null,
            category: formData.get("category") as string | null,
            price: formData.get("price") as string | null,
            mprice: formData.get("mprice") as string | null,
            stock: formData.get("stock") as string | null,
            sold: formData.get("sold") as string | null,
            video: formData.get("video") as string | null,
            seo: formData.get("seo") as string | null,
            warranty: formData.get("warranty") as string | null,
            tags: formData.get("tags") as string | null,
        };

        await connectDb();

        const updateData: Partial<IProduct> = {
            name: fields.name || undefined,
            sname: fields.sname || undefined,
            description: fields.description || undefined,
            category: fields.category || undefined,
            price: fields.price ? parseFloat(fields.price) : undefined,
            mprice: fields.mprice ? parseFloat(fields.mprice) : undefined,
            stock: fields.stock ? parseInt(fields.stock, 10) : undefined,
            sold: fields.sold ? parseInt(fields.sold, 10) : undefined,
            video: fields.video || undefined,
            warranty: fields.warranty || undefined,
            seo: fields.seo || undefined,
            tags: fields.tags ? fields.tags.split(',') : undefined,
        };

        if (images.length > 0) {
            updateData.images = images;
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true })

        if (!updatedProduct) {
            return NextResponse.json({ error: "Product not found" }, { status: 405 });
        }

        return NextResponse.json({
            message: "Product updated successfully",
            product: updatedProduct,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Product Update Errors: ' + error }, { status: 400 });
    }
};

// GET request to fetch product by id
export const GET = async (request: Request, context: { params: any }) => {
    const { id } = await context.params;

    if (!id) {
        return new NextResponse(
            JSON.stringify({ message: "Invalid or missing id" }),
            { status: 400 }
        );
    }

    try {
        await connectDb();

        const product = await Product.findById(id);
        if (!product) {
            return new NextResponse(
                JSON.stringify({ message: "Product not found" }),
                { status: 404 }
            );
        }

        return new NextResponse(JSON.stringify(product), { status: 200 });
    } catch (error) {
        return new NextResponse("Product Fetch Error: " + error, { status: 400 });
    }
};

// DELETE request to delete product by id
export const DELETE = async (request: Request, context: { params: any } ) => {
        const { id } = await context.params;

    if (!id) {
        return new NextResponse(
            JSON.stringify({ message: "Invalid or missing id" }),
            { status: 400 }
        );
    }

    try {
        await connectDb();

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return new NextResponse(
                JSON.stringify({ message: "Product not found" }),
                { status: 404 }
            );
        }

        return new NextResponse(JSON.stringify("Product Deleted"), { status: 200 });
    } catch (error) {
        return new NextResponse("Product Delete Error: " + error, { status: 400 });
    }
};
