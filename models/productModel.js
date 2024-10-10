import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  price: { type: Number, required: true },
  discount_price: { type: Number, required: true },
  material: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  stock_status: { type: String, required: true },
  image_url: { type: String, required: true },
  delivery_estimate: { type: String, required: true },
  return_policy: { type: String, required: true }
});

export default mongoose.model('Product', productSchema);
