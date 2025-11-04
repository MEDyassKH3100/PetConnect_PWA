import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "@/lib/auth-server";
import { UserService } from "@/services/userService";

export async function PUT(request: NextRequest) {
  try {
    const user = await authenticateUser(request); // ✅ await here
    if (!user) {
      return NextResponse.json({ error: "Utilisateur non authentifié" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const { message } = await UserService.changePassword(
      user.id,
      currentPassword,
      newPassword
    );

    return NextResponse.json({ message });
  } catch (error: any) {
    console.error("Erreur changement mot de passe:", error);
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
