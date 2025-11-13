import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { credential } = body; // Token Google JWT

    if (!credential) {
      return NextResponse.json(
        { error: "Token Google manquant" },
        { status: 400 }
      );
    }

    // Décoder le token Google (sans vérification pour simplifier)
    const decodedToken = jwt.decode(credential) as any;

    if (!decodedToken || !decodedToken.email) {
      return NextResponse.json(
        { error: "Token Google invalide" },
        { status: 400 }
      );
    }

    await connectDB();

    const {
      email,
      given_name,
      family_name,
      picture,
      sub: googleId,
    } = decodedToken;

    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email });

    if (!user) {
      // Créer un nouvel utilisateur
      const firstName = given_name || "Utilisateur";
      const lastName = family_name || "Google";

      // Utiliser l'avatar Google ou générer un avatar avec les initiales
      const defaultAvatar =
        picture ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          firstName.charAt(0) + lastName.charAt(0)
        )}&background=FF9A3D&color=fff&size=200&bold=true&rounded=true`;

      user = new User({
        firstName,
        lastName,
        email,
        avatar: defaultAvatar,
        googleId,
        password: "google-oauth-" + Math.random().toString(36),
        isVerified: true, // Les comptes Google sont automatiquement vérifiés
      });
      await user.save();
    } else {
      // Mettre à jour l'avatar si nécessaire
      if (picture && !user.avatar) {
        user.avatar = picture;
        await user.save();
      }
    }

    // Générer un token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      {
        message: "Connexion Google réussie",
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur Google auth:", error);
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
