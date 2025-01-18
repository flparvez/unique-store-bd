import  mongoose, { Document, model, models, Schema } from 'mongoose';

interface Image {
  url: string;
  public_id: string;
}

interface ProductDocuments extends Document {
  name: string;
  slug: string;
  sname: string;
  description: string;

  category: Schema.Types.ObjectId;
  price: number;
  mprice: number;
  images: Image[];
  stock: number;
  sold: number;
  video: string;
  warranty: string;
  tags: string[];
  seo: string;
  lastUpdatedIndex : number
}
const imageSchema = new Schema<Image>({
  url: { type: String, required: true },
  public_id: { type: String, required: true }
});

const productSchema = new Schema<ProductDocuments>({
  name: { type: String, required: true },
  sname: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },  

  price: { type: Number, required: true },
  mprice: { type: Number, required: true },
  images: { type: [imageSchema], required: true },
  stock: { type: Number, required: true },
  sold: { type: Number, required: true },
  video: { type: String },
  warranty: { type: String },
  tags: { type: [String] },
  seo: { type:String, },
  lastUpdatedIndex: {
    type: Number,
    default: 0, // Default priority is 0
  },
},{
  timestamps: true
});


export const Product = models?.Product || mongoose.model('Product', productSchema);