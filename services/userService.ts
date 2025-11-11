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

  // 5. Generate OTP (Générer un OTP pour forgot password)
  static async generateOTP(
    email: string
  ): Promise<{ otp: string; message: string }> {
    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new Error("Aucun utilisateur trouvé avec cet email");
    }

    // Générer un OTP à 6 chiffres
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    return {
      otp,
      message: "Un code OTP a été généré",
    };
  }

  // 6. Verify OTP (Vérifier OTP reçu par email)
  static async verifyOTP(
    email: string,
    otp: string
  ): Promise<{ user: IUser; resetToken: string; message: string }> {
    await connectDB();

    const user = await User.findOne({
<<<<<<< Updated upstream
      email,
      otp,
      otpExpires: { $gt: new Date() },
    });
=======
      email: email.toLowerCase(),
    }).select("+otp +otpExpires");
>>>>>>> Stashed changes

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    if (!user.otp || !user.otpExpires) {
      throw new Error("Aucun OTP n'a été généré pour cet utilisateur");
    }

    if (user.otp !== otp) {
      throw new Error("OTP invalide");
    }

    if (user.otpExpires < new Date()) {
      throw new Error("OTP expiré");
    }

    // Générer un token de réinitialisation
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = expires;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return {
      user,
      resetToken,
      message: "OTP vérifié avec succès",
    };
  }

  // 7. Reset Password (Réinitialiser le mot de passe avec token)
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

  // 8. Change Password (Changer le mot de passe actuel)
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

  // 9. Delete Profile (Supprimer le profil)
  static async deleteProfile(userId: string): Promise<{ message: string }> {
    await connectDB();

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    return { message: "Profil supprimé avec succès" };
  }

<<<<<<< Updated upstream
  // Méthodes utilitaires supplémentaires (optionnelles)
=======
  // 10. Get User by ID (Récupérer un utilisateur par ID)
>>>>>>> Stashed changes
  static async getUserById(userId: string): Promise<IUser | null> {
    await connectDB();
    return User.findById(userId);
  }

<<<<<<< Updated upstream
=======
  // 11. Get All Users (Admin only)
>>>>>>> Stashed changes
  static async getAllUsers(): Promise<IUser[]> {
    await connectDB();
    return User.find({}).sort({ createdAt: -1 });
  }
<<<<<<< Updated upstream
=======

  // 12. Get User by Email
  static async getUserByEmail(email: string): Promise<IUser | null> {
    await connectDB();
    return User.findOne({ email: email.toLowerCase() });
  }

  // 13. Update User Role (Admin only)
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
>>>>>>> Stashed changes
}
