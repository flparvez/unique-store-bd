import { connectDb } from "@/lib/DbConnect";
import slugify from "slugify"
import {Product} from "@/models/product.models";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';


 // Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
});
interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
}

// Function to upload image to Cloudinary with logo, text overlay, crop, and resize
// Function to upload image to Cloudinary with logo, text overlay, crop, and resize
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
           
          },
          {
              "effect": "sharpen:50"
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


// create product


export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: 'Files not found' }, { status: 400 });
    }

    // Upload each file to Cloudinary with overlay transformation
    const uploadResults = await Promise.all(
      files.map(async (file) => await uploadImageWithLogoAndText(file))
    );

    // Extract the secure URLs and public IDs from the upload results
    const images = uploadResults.map((result) => ({
      url: result.secure_url,
      public_id: result.public_id,
    }));

    const name = formData.get("name") as string | null;
    const sname = formData.get("sname") as string | null;
    const description = formData.get("description") as string | null;
    const category = formData.get("category") as string | null;
    const price = parseFloat(formData.get("price") as string || '0');
    const mprice = parseFloat(formData.get("mprice") as string || '0');
    const stock = parseInt(formData.get("stock") as string || '0', 10);
    const sold = parseInt(formData.get("sold") as string || '0', 10);
    const video = formData.get("video") as string | null;
    const seo = formData.get("seo") as string | null;
    const warranty = formData.get("warranty") as string | null;
    const tags = (formData.get("tags") as string || '').split(',');

 

    await connectDb();

    const newProduct = new Product({
      name,
      slug:slugify(name!),
      sname,
      description,
      category,
      price,
      mprice,
      images: images,
      stock,
      video,
      sold,
      warranty,
      tags,
      seo
    });

    await newProduct.save();

    return new NextResponse(
      JSON.stringify({
        message: "Product created successfully",
        product: newProduct,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Product Creation Errors: ' + error }),
      { status: 400 }
    );
  }
};





// Get Products
export const GET =async ( ) =>{


  try {

      await connectDb();

  
      const products = await Product.find().sort({ createdAt: -1 }).populate("category");
   

      return new NextResponse(
        JSON.stringify({products}),{status:200}
      )
  } catch (error) {
    return new NextResponse ("Error in fetching products: " + error,{ status:400})
  }
}
