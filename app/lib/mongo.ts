import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/mydb"; // your local Mongo URI

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectMongo() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectMongo;
