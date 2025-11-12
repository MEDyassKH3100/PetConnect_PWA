import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/services/userService";
import { authenticateUser } from "@/lib/auth";

/**
 * GET /api/profile
 * Récupère le profil de l'utilisateur connecté
 */
export async function GET(request: NextRequest) {
  try {
    console.log("\n📋 ===== RÉCUPÉRATION PROFIL =====");

    // Authentifier l'utilisateur
    const authResult = await authenticateUser(request);
    if (!authResult.authenticated || !authResult.userId) {
      console.log("❌ Non authentifié");
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    console.log("✅ Utilisateur authentifié:", authResult.userId);

    // Récupérer le profil
    const user = await UserService.getUserById(authResult.userId);

    if (!user) {
      console.log("❌ Utilisateur non trouvé");
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    console.log("✅ Profil récupéré:", user.email);
    console.log("==========================================\n");

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.error("\n❌ ===== ERREUR PROFIL =====");
    console.error("🚫 Message:", error.message);
    console.error("==========================================\n");

    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/profile
 * Met à jour le profil de l'utilisateur connecté
 */
export async function PUT(request: NextRequest) {
  try {
    console.log("\n💾 ===== MISE À JOUR PROFIL =====");

    // Authentifier l'utilisateur
    const authResult = await authenticateUser(request);
    if (!authResult.authenticated || !authResult.userId) {
      console.log("❌ Non authentifié");
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const body = await request.json();
    console.log("📝 Données reçues:", body);

    // Mettre à jour le profil
    const updatedUser = await UserService.updateProfile(
      authResult.userId,
      body
    );

    if (!updatedUser) {
      console.log("❌ Erreur lors de la mise à jour");
      return NextResponse.json(
        { error: "Erreur lors de la mise à jour du profil" },
        { status: 500 }
      );
    }

    console.log("✅ Profil mis à jour:", updatedUser.email);
    console.log("==========================================\n");

    return NextResponse.json(
      { user: updatedUser, message: "Profil mis à jour avec succès" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("\n❌ ===== ERREUR MISE À JOUR =====");
    console.error("🚫 Message:", error.message);
    console.error("==========================================\n");

    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
