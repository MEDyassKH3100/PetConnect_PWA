import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import {
  JWTPayload,
  AuthenticatedUser,
  extractToken,
  isTokenExpired,
} from "./auth";

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
