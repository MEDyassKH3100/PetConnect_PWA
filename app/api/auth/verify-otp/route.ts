import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/services/userService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    console.log("\n🔍 ===== VÉRIFICATION OTP =====");
    console.log("📧 Email:", email);
    console.log("🔢 OTP reçu:", otp);
    console.log("📊 Type OTP:", typeof otp);
    console.log("📊 Longueur OTP:", otp?.length);

    // Validation
    if (!email || !otp) {
      console.log("❌ Validation échouée: email ou OTP manquant");
      return NextResponse.json(
        { error: "Email et code OTP sont requis" },
        { status: 400 }
      );
    }

    if (otp.length !== 6) {
      console.log("❌ Validation échouée: OTP doit avoir 6 chiffres");
      return NextResponse.json(
        { error: "Le code OTP doit contenir 6 chiffres" },
        { status: 400 }
      );
    }

    console.log("🚀 Appel UserService.verifyOTP...");
    // Vérifier l'OTP avec le service
    const result = await UserService.verifyOTP(email, otp);
    console.log("✅ OTP vérifié avec succès!");
    console.log("🆔 Reset Token:", result.resetToken);

    console.log("================================\n");

    return NextResponse.json(
      {
        message: result.message,
        resetToken: result.resetToken,
        verified: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("\n❌ ===== ERREUR VÉRIFICATION OTP =====");
    console.error("🚫 Message:", error.message);
    console.error("📊 Stack:", error.stack);
    console.error("================================\n");

    if (
      error.message.includes("invalide") ||
      error.message.includes("expiré")
    ) {
      return NextResponse.json(
        { error: "Code OTP invalide ou expiré" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
