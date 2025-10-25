import connectDB from "../lib/db";
import User, { IUser } from "../models/User";
import { generateToken, generateRefreshToken } from "../lib/auth";
import crypto from "crypto";

export class UserService {
  // 1. Register (Inscription)
  static async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
  }): Promise<IUser> {
    await connectDB();

    // Vérifier que l'email n'existe pas déjà
    const existingUser = await User.findOne({
      email: userData.email.toLowerCase(),
    });
    if (existingUser) {
      throw new Error("Cet email est déjà utilisé");
    }

    // Validation supplémentaire
    if (userData.password.length < 6) {
      throw new Error("Le mot de passe doit contenir au moins 6 caractères");
    }

    const user = new User({
      ...userData,
      email: userData.email.toLowerCase(),
    });

    await user.save();
    return user;
  }

  // 2. Login (Connexion) - Version optimisée
  static async login(
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string; refreshToken: string }> {
    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );
    if (!user) {
      throw new Error("Email ou mot de passe incorrect");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Email ou mot de passe incorrect");
    }

    // Générer les tokens avec les utilitaires sécurisés
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return { user, token, refreshToken };
  }

  // 3. Update Profile (Mettre à jour le profil)
  static async updateProfile(
    userId: string,
    updateData: Partial<{
      firstName: string;
      lastName: string;
      phone: string;
      address: string;
      avatar: string;
    }>
  ): Promise<IUser | null> {
    await connectDB();
    return User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
  }

  // 4. Forget Password (Demander réinitialisation de mot de passe)
  static async forgetPassword(
    email: string
  ): Promise<{ resetToken: string; message: string }> {
    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new Error("Aucun utilisateur trouvé avec cet email");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = expires;
    await user.save();

    return {
      resetToken,
      message:
        "Un token de réinitialisation a été généré (à envoyer par email)",
    };
  }

  // 5. Verify OTP (Vérifier OTP reçu par email)
  static async verifyOTP(
    email: string,
    otp: string
  ): Promise<{ user: IUser; message: string }> {
    await connectDB();

    const user = await User.findOne({
      email: email.toLowerCase(),
      otp,
      otpExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new Error("OTP invalide ou expiré");
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return { user, message: "Compte vérifié avec succès" };
  }

  // 6. Reset Password (Réinitialiser le mot de passe avec token)
  static async resetPassword(
    token: string,
    newPassword: string
  ): Promise<{ user: IUser; message: string }> {
    await connectDB();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    }).select("+password");

    if (!user) {
      throw new Error("Token invalide ou expiré");
    }

    // Validation du nouveau mot de passe
    if (newPassword.length < 6) {
      throw new Error("Le mot de passe doit contenir au moins 6 caractères");
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return { user, message: "Mot de passe réinitialisé avec succès" };
  }

  // 7. Change Password (Changer le mot de passe actuel)
  static async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<{ user: IUser; message: string }> {
    await connectDB();

    const user = await User.findById(userId).select("+password");
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      throw new Error("Mot de passe actuel incorrect");
    }

    // Validation du nouveau mot de passe
    if (newPassword.length < 6) {
      throw new Error("Le mot de passe doit contenir au moins 6 caractères");
    }

    user.password = newPassword;
    await user.save();

    return { user, message: "Mot de passe changé avec succès" };
  }

  // 8. Delete Profile (Supprimer le profil)
  static async deleteProfile(userId: string): Promise<{ message: string }> {
    await connectDB();

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    return { message: "Profil supprimé avec succès" };
  }

  // 9. Get User by ID (Récupérer un utilisateur par ID)
  static async getUserById(userId: string): Promise<IUser | null> {
    await connectDB();
    return User.findById(userId);
  }

  // 10. Get All Users (Admin only)
  static async getAllUsers(): Promise<IUser[]> {
    await connectDB();
    return User.find({}).sort({ createdAt: -1 });
  }

  // 11. Get User by Email
  static async getUserByEmail(email: string): Promise<IUser | null> {
    await connectDB();
    return User.findOne({ email: email.toLowerCase() });
  }

  // 12. Update User Role (Admin only)
  static async updateUserRole(
    userId: string,
    role: "user" | "admin" | "vet"
  ): Promise<IUser | null> {
    await connectDB();
    return User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    );
  }
}
