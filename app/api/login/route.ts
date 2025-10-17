import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const MONGO_URI = "mongodb://localhost:27017/mydb"; // same as signup
const JWT_SECRET = "your_super_secret_key";

let cachedClient: MongoClient | null = null;

async function connectMongo() {
  if (cachedClient) return cachedClient.db("mydb");
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  cachedClient = client;
  return client.db("mydb");
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json(); // only email & password

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const db = await connectMongo();
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
