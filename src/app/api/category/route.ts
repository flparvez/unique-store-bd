import { connectDb } from "@/lib/DbConnect";
import slugify from "slugify"

import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { Category } from "@/models/category.schema";


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
const uploadImageWithLogoAndText = async (file: File): Promise<CloudinaryUploadResult> => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<CloudinaryUploadResult>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'next-cloudinary-uploads',
        transformation: [
          {
            width: 800,
            height: 800,
            crop: 'fill',
            gravity: 'auto',
          },
          {
            overlay: 'neqgwethxryghhmggnvi', // Replace with your logo's public ID in Cloudinary
            gravity: 'south_east',
            width: 100,
            opacity: 80,
            x: 10,
            y: 10,
            crop: 'scale'
          },
          {
            overlay: {
              font_family: 'Poppins', // Stylish and bold font
              font_size: 30,
           
              text: 'Unique Store Bd' // Replace with your shop name
            },
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
    const tags = formData.get("tags") as string | null;

 

    await connectDb();

    const newProduct = new Category({
      name,
      tags,
      images,
      slug:slugify(name!),
     
    });

    await newProduct.save();

    return new NextResponse(
      JSON.stringify({
        message: "Category created successfully",
        product: newProduct,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Category Creation Errors: ' + error }),
      { status: 400 }
    );
  }
};



// Get Categories
export const GET =async ( ) =>{


    try {
  
        await connectDb();
  
    
        const category = await Category.find().sort({ createdAt: -1 });
     
  
        return new NextResponse(
          JSON.stringify({category}),{status:200}
        )
    } catch (error) {
      return new NextResponse ("Error in fetching products: " + error,{ status:400})
    }
  }
  