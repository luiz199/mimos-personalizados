import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const cached: Cached = { conn: null, promise: null };

export async function connect() {
  if (!MONGODB_URI) return null;
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { dbName: 'mimos' });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

const ProductSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  price: Number,
  oldPrice: Number,
  image: String,
  category: String,
  subcategory: String,
  isOffer: Boolean,
  createdAt: Number,
}, { timestamps: false });

export const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);
