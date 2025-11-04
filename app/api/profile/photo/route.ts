import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "@/lib/auth-server";
import User from "@/models/User";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateUser(request); // ✅ await here
    const formData = await request.formData();
    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier envoyé" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const fileName = `${user.id}-${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);

    const avatarUrl = `/uploads/${fileName}`;
    await User.findByIdAndUpdate(user.id, { avatar: avatarUrl });

    return NextResponse.json({ message: "Avatar mis à jour", avatarUrl });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur serveur" },
      { status: 500 }
    );
  }
}

