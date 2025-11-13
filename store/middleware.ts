import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes publiques (accessibles sans authentification)
const publicRoutes = [
  "/",
  "/auth/login",
  "/auth/signup",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/refresh",
];

// Routes protégées (nécessitent un token)
const protectedRoutes = [
  "/home",
  "/profile",
  "/settings",
  "/pets",
  "/appointments",
  "/health",
  "/nutrition",
  "/education",
  "/adoption",
  "/notifications",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier si c'est une route API protégée (pas les pages, seulement les API)
  const isProtectedApiRoute =
    pathname.startsWith("/api/") &&
    !publicRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedApiRoute) {
    // Vérifier la présence du token pour les routes API
    const token =
      request.cookies.get("token")?.value ||
      request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      );
    }
  }

  // Laisser passer toutes les routes de pages (la vérification se fait côté client)
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|images|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
