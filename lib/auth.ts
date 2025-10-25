import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key_12345";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// Types pour les payloads JWT
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

// Extraire le token du header Authorization
export function extractTokenFromHeader(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7); // Remove "Bearer " prefix
}

// Vérifier si un token est expiré
export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  return decoded.exp * 1000 < Date.now();
}

// Générer un token JWT
export function generateToken(
  payload: Omit<JWTPayload, "iat" | "exp">
): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: "PetCareVerse",
    audience: "PetCareVerse-Users",
  } as jwt.SignOptions);
}

// Vérifier et décoder un token JWT
export function verifyToken(token: string): JWTPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: "PetCareVerse",
      audience: "PetCareVerse-Users",
    } as jwt.VerifyOptions) as JWTPayload;
    return decoded;
  } catch (error) {
    throw new Error("Token invalide ou expiré");
  }
}

// Décoder un token JWT (sans vérification)
export function decodeToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || typeof decoded === "string") {
      return null;
    }
    return decoded as JWTPayload;
  } catch (error) {
    return null;
  }
}

// Middleware helper pour vérifier l'authentification
export function authenticateUser(request: NextRequest): AuthenticatedUser {
  const token = extractTokenFromHeader(request);
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

// Générer un refresh token (pour implémentation future)
export function generateRefreshToken(
  payload: Omit<JWTPayload, "iat" | "exp">
): string {
  return jwt.sign(payload, JWT_SECRET + "_REFRESH", {
    expiresIn: "30d",
    issuer: "PetCareVerse",
    audience: "PetCareVerse-Refresh",
  } as jwt.SignOptions);
}

// Vérifier un refresh token
export function verifyRefreshToken(token: string): JWTPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET + "_REFRESH", {
      issuer: "PetCareVerse",
      audience: "PetCareVerse-Refresh",
    } as jwt.VerifyOptions) as JWTPayload;
    return decoded;
  } catch (error) {
    throw new Error("Refresh token invalide ou expiré");
  }
}
