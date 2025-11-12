import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "@/lib/auth";
import { UserService } from "@/services/userService";

/**
 * PUT /api/profile/password
 * Change le mot de passe de l'utilisateur connecté
 */
export async function PUT(request: NextRequest) {
  try {
    console.log("\n🔐 ===== CHANGEMENT MOT DE PASSE =====");

    // Authentifier l'utilisateur
    const authResult = await authenticateUser(request);
    if (!authResult.authenticated || !authResult.userId) {
      console.log("❌ Non authentifié");
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    console.log("👤 Utilisateur:", authResult.userId);

    if (!currentPassword || !newPassword) {
      console.log("❌ Données manquantes");
      return NextResponse.json(
        { error: "Mot de passe actuel et nouveau mot de passe requis" },
        { status: 400 }
      );
    }

    // Changer le mot de passe
    await UserService.changePassword(
      authResult.userId,
      currentPassword,
      newPassword
    );

    console.log("✅ Mot de passe changé avec succès");
    console.log("==========================================\n");

    return NextResponse.json(
      { message: "Mot de passe mis à jour avec succès" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("\n❌ ===== ERREUR CHANGEMENT MOT DE PASSE =====");
    console.error("🚫 Message:", error.message);
    console.error("==========================================\n");

    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
