import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is missing in .env.local");

// Cache the connection so Vercel does not open a new one on every request
let cached = global._mongoose || (global._mongoose = { conn: null, promise: null });

export async function connectDB() {
  if (cached.conn) return cached.conn;
  cached.promise ||= mongoose.connect(uri);
  cached.conn = await cached.promise;
  return cached.conn;
}
