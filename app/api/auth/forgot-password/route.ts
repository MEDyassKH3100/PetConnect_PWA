import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/lib/db";
import { sendOTPEmail } from "@/lib/email-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validation de l'email
    if (!email) {
      return NextResponse.json(
        { error: "L'email est requis" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    await connectDB();

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Pour la sécurité, on retourne un succès même si l'email n'existe pas
      return NextResponse.json(
        {
          message: "Si cet email existe, un code de vérification a été envoyé",
        },
        { status: 200 }
      );
    }

    // Générer un OTP à 6 chiffres
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Sauvegarder l'OTP dans la base de données
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Envoyer l'OTP par email
    const emailResult = await sendOTPEmail(
      email,
      otp,
      `${user.firstName} ${user.lastName}`
    );

    if (!emailResult.success) {
      console.error("❌ Erreur envoi email:", emailResult.message);
      // On continue quand même pour ne pas révéler si l'email existe
    } else {
      console.log(`✅ OTP envoyé par email à ${email}`);
    }

    // En développement, logger l'OTP dans la console
    if (process.env.NODE_ENV === "development") {
      console.log(`📧 OTP pour ${email}: ${otp}`);
    }

    return NextResponse.json(
      {
        message: "Un code de vérification a été envoyé à votre email",
        // En développement uniquement, retourner l'OTP
        ...(process.env.NODE_ENV === "development" && { otp }),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur forgot password:", error);
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
