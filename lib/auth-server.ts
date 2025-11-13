import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

// Types
export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
}

// Fonction pour extraire le token
export function extractToken(request: NextRequest): string | null {
  // Essayer depuis les headers Authorization
  const authHeader = request.headers.get("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  // Essayer depuis les cookies
  const cookieToken = request.cookies.get("token")?.value;
  if (cookieToken) {
    return cookieToken;
  }

  return null;
}

// Fonction pour vérifier si le token est expiré
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwt.decode(token) as JWTPayload;
    if (!decoded || !decoded.exp) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
}

// Fonctions pour obtenir JWT_SECRET et JWT_EXPIRES_IN
function getJWTSecret(): string {
  return (
    process.env.JWT_SECRET ||
    "dev_fallback_secret_key_minimum_32_characters_for_security"
  );
}

function getJWTExpiresIn(): string {
  return process.env.JWT_EXPIRES_IN || "7d";
}

// Générer un token JWT
export function generateToken(
  payload: Omit<JWTPayload, "iat" | "exp">
): string {
  return jwt.sign(payload, getJWTSecret(), {
    expiresIn: getJWTExpiresIn(),
    issuer: "PetCareVerse",
    audience: "PetCareVerse-Users",
  } as jwt.SignOptions);
}

// Vérifier et décoder un token JWT
export function verifyToken(token: string): JWTPayload {
  try {
    const decoded = jwt.verify(token, getJWTSecret(), {
      issuer: "PetCareVerse",
      audience: "PetCareVerse-Users",
    } as jwt.VerifyOptions) as JWTPayload;
    return decoded;
  } catch (error) {
    throw new Error("Token invalide ou expiré");
  }
}

// Middleware helper pour vérifier l'authentification
export function authenticateUser(request: NextRequest): AuthenticatedUser {
  // Essayer d'extraire le token depuis header ou cookies
  const token = extractToken(request);
  if (!token) {
    throw new Error("Token d'authentification requis");
  }

  if (isTokenExpired(token)) {
    throw new Error("Token expiré");
  }

  const decoded = verifyToken(token);
  return {
    id: decoded.userId,
    email: decoded.email,
    role: decoded.role,
  };
}

// Générer un refresh token
export function generateRefreshToken(
  payload: Omit<JWTPayload, "iat" | "exp">
): string {
  return jwt.sign(payload, getJWTSecret() + "_REFRESH", {
    expiresIn: "30d",
    issuer: "PetCareVerse",
    audience: "PetCareVerse-Refresh",
  } as jwt.SignOptions);
}

// Vérifier un refresh token
export function verifyRefreshToken(token: string): JWTPayload {
  try {
    const decoded = jwt.verify(token, getJWTSecret() + "_REFRESH", {
      issuer: "PetCareVerse",
      audience: "PetCareVerse-Refresh",
    } as jwt.VerifyOptions) as JWTPayload;
    return decoded;
  } catch (error) {
    throw new Error("Refresh token invalide ou expiré");
  }
}
