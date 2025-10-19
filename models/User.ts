import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  avatar?: string;
  role: "user" | "admin" | "vet";
  isVerified: boolean;
  otp?: string;
  otpExpires?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 50 },
    lastName: { type: String, required: true, trim: true, maxlength: 50 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email invalide"],
    },
    password: { type: String, required: true, minlength: 6, select: false },
    phone: { type: String, maxlength: 20 },
    address: { type: String, maxlength: 200 },
    avatar: { type: String },
    role: { type: String, enum: ["user", "admin", "vet"], default: "user" },
    isVerified: { type: Boolean, default: false },
    otp: { type: String, select: false },
    otpExpires: { type: Date, select: false },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User: mongoose.Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);


export class UserService {
  static async register(userData: { firstName: string; lastName: string; email: string; password: string }): Promise<IUser> {
    await connectDB();
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) throw new Error("Cet email est déjà utilisé");
    const user = new User(userData);
    await user.save();
    return user;
  }

  static async login(credentials: { email: string; password: string }): Promise<IUser | null> {
    await connectDB();
    const user = await User.findOne({ email: credentials.email }).select("+password");
    if (!user) return null;
    const isMatch = await user.comparePassword(credentials.password);
    if (!isMatch) return null;
    return user;
  }
}

export default User;
