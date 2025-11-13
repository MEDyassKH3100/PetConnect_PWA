import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/services/userService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = body;

    console.log("\n🔐 ===== RÉINITIALISATION MOT DE PASSE =====");
    console.log("🆔 Token reçu:", token);
    console.log(
      "🔑 Nouveau mot de passe:",
      password ? `✅ Fourni (${password.length} caractères)` : "❌ Manquant"
    );

    // Validation
    if (!token || !password) {
      console.log("❌ Validation échouée: token ou mot de passe manquant");
      return NextResponse.json(
        { error: "Token et nouveau mot de passe sont requis" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      console.log("❌ Validation échouée: mot de passe trop court");
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 6 caractères" },
        { status: 400 }
      );
    }

    console.log("🚀 Appel UserService.resetPassword...");
    // Réinitialiser le mot de passe avec le service
    const result = await UserService.resetPassword(token, password);
    console.log("✅ Mot de passe réinitialisé avec succès!");

    console.log("==========================================\n");

    return NextResponse.json(
      {
        message: result.message,
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("\n❌ ===== ERREUR RÉINITIALISATION =====");
    console.error("🚫 Message:", error.message);
    console.error("📊 Stack:", error.stack);
    console.error("==========================================\n");

    if (
      error.message.includes("invalide") ||
      error.message.includes("expiré")
    ) {
      return NextResponse.json(
        { error: "Token invalide ou expiré" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
