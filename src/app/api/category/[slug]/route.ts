import { connectDb } from "@/lib/DbConnect";

import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { Category } from "@/models/category.schema";

// Configuration for Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

interface ICategory {
    name?: string;
    tags?: string;
    images?: { url: string; public_id: string }[];
}
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
                    { width: 800, height: 800, crop: 'fill', gravity: 'auto' },
                    {
                        overlay: 'neqgwethxryghhmggnvi', // Replace with your logo's public ID
                        gravity: 'south_east',
                        width: 100,
                        opacity: 80,
                        x: 10,
                        y: 10,
                        crop: 'scale',
                    },
                    {
                        overlay: { font_family: 'Poppins', font_size: 30, text: 'uniquestorebd' },
                        gravity: 'center',
                        color: '#FF0000', // Text color
                        opacity: 80,
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
// Interface for the category schema


// PATCH request to update category by id
export const PATCH = async (request: NextRequest, context: { params: any }) => {
    const slug = context.params.slug; // Extract the id from params

    if (!slug) {
        return NextResponse.json({ error: "Missing category id" }, { status: 400 });
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
            tags: formData.get("tags") as string | null,
   
        };

        await connectDb();
        const category = await Category.findOne({slug:slug});
  
        if (!category) {
            return new NextResponse (
                JSON.stringify({message:"Category not founds"}),
                {status:405}
            )
        }


        const updateData: Partial<ICategory> = {
            name: fields.name || undefined,
            tags: fields.tags || undefined,
          
        };

        if (images.length > 0) {
            updateData.images = images;
        }

        const updatedcategory = await Category.findOneAndUpdate(
            {slug:slug}, updateData, { new: true }
        );

        if (!updatedcategory) {
            return NextResponse.json({ error: "category not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "category updated successfully",
            category: updatedcategory,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'category Update Errors: ' + error }, { status: 400 });
    }
};











// DELETE request to delete category by id
export const DELETE = async (request: Request, context: { params: any } ) => {
    const id = context.params.id; // Extract the id from params

    if (!id) {
        return new NextResponse(
            JSON.stringify({ message: "Invalid or missing id" }),
            { status: 400 }
        );
    }

    try {
        await connectDb();

        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return new NextResponse(
                JSON.stringify({ message: "category not found" }),
                { status: 404 }
            );
        }

        return new NextResponse(JSON.stringify("Category Deleted"), { status: 200 });
    } catch (error) {
        return new NextResponse("Category Delete Error: " + error, { status: 400 });
    }
};
