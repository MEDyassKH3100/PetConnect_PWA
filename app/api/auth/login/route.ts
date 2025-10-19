import { UserService } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe sont requis" },
        { status: 400 }
      );
    }

    // Vérifier l'utilisateur via le service
    const user = await UserService.login({ email, password });

    if (!user) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Ici, vous pouvez créer un token JWT si vous voulez
    // const token = createJWT(user);

    return NextResponse.json(
      { message: "Connexion réussie", user /*, token */ },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur login:", error);
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
