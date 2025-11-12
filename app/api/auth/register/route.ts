import { UserService } from "@/services/userService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;

    // Validation basique
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Appeler le service
    const result = await UserService.register({
      firstName,
      lastName,
      email,
      password,
    });

    // Succès
    return NextResponse.json(
      {
        message: result.message,
        user: result.user,
        requiresVerification: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erreur lors de l'inscription :", error);
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
