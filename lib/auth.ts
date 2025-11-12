import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "petconnect_super_secret_key_change_this_in_production_minimum_32_characters_random";

interface AuthResult {
  authenticated: boolean;
  userId?: string;
  email?: string;
  role?: string;
  error?: string;
}

/**
 * Authentifie l'utilisateur à partir du token JWT dans les headers
 */
export async function authenticateUser(
  request: NextRequest
): Promise<AuthResult> {
  try {
    // Récupérer le token depuis les headers
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ Aucun token fourni");
      return {
        authenticated: false,
        error: "Token manquant",
      };
    }

    // Extraire le token
    const token = authHeader.substring(7); // Enlever "Bearer "

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId?: string;
      id?: string;
      email?: string;
      role?: string;
    };

    // Le token peut avoir soit 'userId' soit 'id'
    const userId = decoded.userId || decoded.id;

    if (!userId) {
      console.log("❌ Token invalide: pas d'userId");
      return {
        authenticated: false,
        error: "Token invalide",
      };
    }

    console.log("✅ Utilisateur authentifié:", userId);

    return {
      authenticated: true,
      userId,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error: any) {
    console.error("❌ Erreur authentification:", error.message);

    if (error.name === "TokenExpiredError") {
      return {
        authenticated: false,
        error: "Token expiré",
      };
    }

    if (error.name === "JsonWebTokenError") {
      return {
        authenticated: false,
        error: "Token invalide",
      };
    }

    return {
      authenticated: false,
      error: "Erreur d'authentification",
    };
  }
}

/**
 * Extrait le token depuis les cookies (alternative)
 */
export function getTokenFromCookies(request: NextRequest): string | null {
  const token = request.cookies.get("token")?.value;
  return token || null;
}

/**
 * Vérifie si l'utilisateur a un rôle spécifique
 */
export function hasRole(authResult: AuthResult, requiredRole: string): boolean {
  return authResult.authenticated && authResult.role === requiredRole;
}

/**
 * Vérifie si l'utilisateur est admin
 */
export function isAdmin(authResult: AuthResult): boolean {
  return hasRole(authResult, "admin");
}

/**
 * Vérifie si l'utilisateur est vétérinaire
 */
export function isVet(authResult: AuthResult): boolean {
  return hasRole(authResult, "vet");
}
