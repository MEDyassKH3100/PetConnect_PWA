import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "@/lib/auth";
import { UserService } from "@/services/userService";

/**
 * POST /api/profile/avatar
 * Upload l'avatar de l'utilisateur connecté
 */
export async function POST(request: NextRequest) {
  try {
    console.log("\n📸 ===== UPLOAD AVATAR =====");

    // Authentifier l'utilisateur
    const authResult = await authenticateUser(request);
    if (!authResult.authenticated || !authResult.userId) {
      console.log("❌ Non authentifié");
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("avatar") as File;

    if (!file) {
      console.log("❌ Aucun fichier fourni");
      return NextResponse.json(
        { error: "Aucun fichier fourni" },
        { status: 400 }
      );
    }

    console.log("📁 Fichier reçu:", file.name, file.size, "bytes");

    // Vérifier le type de fichier
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      console.log("❌ Type de fichier invalide:", file.type);
      return NextResponse.json(
        { error: "Type de fichier invalide. Utilisez JPG, PNG, GIF ou WebP." },
        { status: 400 }
      );
    }

    // Vérifier la taille du fichier (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      console.log("❌ Fichier trop volumineux:", file.size, "bytes");
      return NextResponse.json(
        { error: "Le fichier est trop volumineux. Taille maximale: 5MB" },
        { status: 400 }
      );
    }

    // Convertir le fichier en Base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const avatarUrl = `data:${file.type};base64,${base64}`;

    console.log("✅ Image convertie en Base64");

    // Mettre à jour l'avatar dans la base de données
    const updatedUser = await UserService.updateProfile(authResult.userId, {
      avatar: avatarUrl,
    });

    console.log("✅ Avatar mis à jour");
    console.log("==========================================\n");

    return NextResponse.json(
      { user: updatedUser, message: "Avatar mis à jour avec succès" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("\n❌ ===== ERREUR UPLOAD AVATAR =====");
    console.error("🚫 Message:", error.message);
    console.error("==========================================\n");

    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
