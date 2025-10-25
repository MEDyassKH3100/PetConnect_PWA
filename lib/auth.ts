// Client-safe auth utilities (no JWT verification)
import { NextRequest } from "next/server";

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

// Extraire le token depuis les cookies
export function extractTokenFromCookies(request: NextRequest): string | null {
  const token = request.cookies.get("token")?.value;
  return token || null;
}

// Extraire le token (header ou cookie)
export function extractToken(request: NextRequest): string | null {
  // Priorité au header Authorization
  const headerToken = extractTokenFromHeader(request);
  if (headerToken) return headerToken;

  // Fallback sur les cookies
  return extractTokenFromCookies(request);
}

// Vérifier si un token est expiré (utilise decodeToken qui ne nécessite pas JWT_SECRET)
export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  return decoded.exp * 1000 < Date.now();
}

// Décoder un token JWT (sans vérification) - Version client-safe
export function decodeToken(token: string): JWTPayload | null {
  try {
    // Décoder manuellement le JWT sans bibliothèque (base64)
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = parts[1];
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );
    return decoded as JWTPayload;
  } catch (error) {
    return null;
  }
}

// NOTE: Les fonctions suivantes ont été déplacées vers lib/auth-server.ts
// car elles nécessitent jsonwebtoken qui ne fonctionne que côté serveur:
// - generateToken
// - verifyToken
// - authenticateUser
// - generateRefreshToken
// - verifyRefreshToken
