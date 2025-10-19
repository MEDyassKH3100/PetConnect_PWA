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
    firstName: {
      type: String,
      required: [true, "Le prénom est obligatoire"],
      trim: true,
      maxlength: [50, "Le prénom ne peut pas dépasser 50 caractères"],
    },
    lastName: {
      type: String,
      required: [true, "Le nom est obligatoire"],
      trim: true,
      maxlength: [50, "Le nom ne peut pas dépasser 50 caractères"],
    },
    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Veuillez entrer un email valide",
      ],
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est obligatoire"],
      minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"],
      select: false,
    },
    phone: {
      type: String,
      maxlength: [20, "Le téléphone ne peut pas dépasser 20 caractères"],
    },
    address: {
      type: String,
      maxlength: [200, "L'adresse ne peut pas dépasser 200 caractères"],
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "vet"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      select: false,
    },
    otpExpires: {
      type: Date,
      select: false,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hacher le mot de passe avant de sauvegarder
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Méthode pour comparer les mots de passe
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export class UserService {
  static async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<IUser> {
    await connectDB(); // Assurer la connexion

    // Créer le modèle après la connexion
    const User =
      mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) throw new Error("Cet email est déjà utilisé");

    const user = new User(userData);
    await user.save();
    return user;
  }
}

let User: mongoose.Model<IUser>;
try {
  User = mongoose.models.User as mongoose.Model<IUser>;
} catch {
  User = mongoose.model<IUser>("User", UserSchema);
}

export default User;
