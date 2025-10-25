import { UserService } from "@/services/userService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation des données d'entrée
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe sont requis" },
        { status: 400 }
      );
    }

    // Validation format email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    // Utiliser UserService pour l'authentification
    const authResult = await UserService.login(email, password);

    // Créer une réponse sécurisée (sans le mot de passe)
    const { password: _, ...userWithoutPassword } = authResult.user.toObject();

    // Succès de la connexion
    return NextResponse.json(
      {
        message: "Connexion réussie",
        user: userWithoutPassword,
        token: authResult.token,
        refreshToken: authResult.refreshToken,
        expiresIn: "7d",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur login:", error);

    // Gestion des erreurs spécifiques
    if (error.message.includes("Email ou mot de passe incorrect")) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Erreur serveur lors de la connexion" },
      { status: 500 }
    );
  }
}
