import { NextRequest, NextResponse } from "next/server";
import { verifyRefreshToken, generateToken } from "@/lib/auth-server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token requis" },
        { status: 400 }
      );
    }

    // Vérifier le refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Générer un nouveau token d'accès
    const newToken = generateToken({
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    });

    return NextResponse.json(
      {
        message: "Token rafraîchi avec succès",
        token: newToken,
        expiresIn: "7d",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur refresh token:", error);

    if (
      error.message.includes("invalide") ||
      error.message.includes("expiré")
    ) {
      return NextResponse.json(
        {
          error: "Refresh token invalide ou expiré. Veuillez vous reconnecter.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Erreur serveur lors du rafraîchissement du token" },
      { status: 500 }
    );
  }
}
