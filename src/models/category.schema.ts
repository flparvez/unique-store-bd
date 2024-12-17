
import mongoose, { Schema } from "mongoose";

interface Image {
  url: string;
  public_id: string;
}

const imageSchema = new Schema<Image>({
  url: { type: String, required: true },
  public_id: { type: String, required: true }
});

const categorySchema= new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    images: { type: [imageSchema], required: true },
    slug: { type: String, unique: true },
},{timestamps: true});






export const Category = mongoose.model('Category', categorySchema);
