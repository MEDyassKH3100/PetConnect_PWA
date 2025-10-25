import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const MONGO_URI = "mongodb://localhost:27017/mydb"; // local MongoDB
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key_12345";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
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
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const db = await connectMongo();
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    const token = jwt.sign({ userId: result.insertedId, email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      issuer: "PetCareVerse",
      audience: "PetCareVerse-Users",
    } as jwt.SignOptions);

    return NextResponse.json(
      { message: "User created", token },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
