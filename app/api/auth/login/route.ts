import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { UserService } from "@/services/userService";

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

    // UserService.login retourne { user, token }
    const result = await UserService.login(email, password);

    // Le token est déjà généré par UserService.login
    // Pas besoin de le regénérer ici

    return NextResponse.json(
      {
        message: "Connexion réussie",
        user: result.user,
        token: result.token,
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
