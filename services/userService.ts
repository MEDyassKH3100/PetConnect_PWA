import connectDB from "../lib/db";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

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

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Cet email est déjà utilisé");
    }

    const user = new User(userData);
    await user.save();
    return user;
  }

  // 2. Login (Connexion)
  static async login(
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string }> {
    await connectDB();

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Email ou mot de passe incorrect");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Email ou mot de passe incorrect");
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return { user, token };
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

    const user = await User.findOne({ email });
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

    // Ici, vous pourriez intégrer un service d'email pour envoyer le token par mail
    // Exemple : await sendEmail(email, 'Réinitialisation de mot de passe', `Votre token: ${resetToken}`);

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
      email,
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

  // Méthodes utilitaires supplémentaires (optionnelles)
  static async getUserById(userId: string): Promise<IUser | null> {
    await connectDB();
    return User.findById(userId);
  }

  static async getAllUsers(): Promise<IUser[]> {
    await connectDB();
    return User.find({}).sort({ createdAt: -1 });
  }
}
