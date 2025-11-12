import connectDB from "../lib/db";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

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
    avatar?: string;
  }): Promise<{ user: IUser; message: string }> {
    await connectDB();

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Cet email est déjà utilisé");
    }

    // Générer un avatar par défaut avec les initiales si non fourni
    const initials = `${userData.firstName.charAt(0)}${userData.lastName.charAt(
      0
    )}`;
    const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      initials
    )}&background=FF9A3D&color=fff&size=200&bold=true&rounded=true`;

    // Créer l'utilisateur (non vérifié par défaut)
    const user = new User({
      ...userData,
      avatar: userData.avatar || defaultAvatar,
    });

    // Générer un token de vérification d'email
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 heures

    await user.save();

    // Envoyer l'email de vérification
    try {
      await this.sendVerificationEmail(
        user.email,
        verificationToken,
        user.firstName
      );
    } catch (emailError) {
      console.error("Erreur lors de l'envoi de l'email:", emailError);
      // Ne pas bloquer l'inscription si l'email échoue
    }

    return {
      user,
      message:
        "Inscription réussie ! Un email de vérification a été envoyé à votre adresse.",
    };
  }

  // Envoyer l'email de vérification
  static async sendVerificationEmail(
    email: string,
    token: string,
    firstName: string
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🐾 Vérifiez votre compte PetConnect",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: #FF9A3D; padding: 40px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 32px;">🐾 PetConnect</h1>
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px 30px; background-color: #f9f9f9;">
                      <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 24px;">Bonjour ${firstName} !</h2>
                      <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                        Bienvenue sur PetConnect ! Pour compléter votre inscription, veuillez vérifier votre adresse email en cliquant sur le bouton ci-dessous :
                      </p>
                      <!-- Button -->
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td align="center" style="padding: 20px 0;">
                            <a href="${verificationUrl}" style="background-color: #FF9A3D; color: #ffffff; padding: 16px 50px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(255, 154, 61, 0.3);">
                              ✅ Vérifier mon email
                            </a>
                          </td>
                        </tr>
                      </table>
                      
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px; background-color: #ffffff; border-top: 1px solid #eeeeee;">
                      <p style="color: #999999; font-size: 12px; text-align: center; margin: 0;">
                        Si vous n'avez pas créé de compte PetConnect, ignorez cet email.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
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
    // Vérifier si l'email est vérifié (sauf pour les comptes Google)
    if (!user.isVerified && !user.googleId) {
      throw new Error(
        "Veuillez vérifier votre email avant de vous connecter. Vérifiez votre boîte de réception."
      );
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
      email: email.toLowerCase(),
    }).select("+otp +otpExpires");

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

  // 10. Get User by ID (Récupérer un utilisateur par ID)
  static async getUserById(userId: string): Promise<IUser | null> {
    await connectDB();
    return User.findById(userId);
  }

  // 11. Get All Users (Admin only)
  static async getAllUsers(): Promise<IUser[]> {
    await connectDB();
    return User.find({}).sort({ createdAt: -1 });
  }

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
}
