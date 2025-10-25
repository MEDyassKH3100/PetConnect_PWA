"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
// Fonction locale pour décoder le token (évite l'import problématique)
function decodeToken(token: string): any | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return decoded;
  } catch (error) {
    return null;
  }
}

// Interface simplifiée pour les données utilisateur
interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  role: "user" | "admin" | "vet";
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier l'authentification au montage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem("token");
        const storedRefreshToken = localStorage.getItem("refreshToken");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
          // Vérifier si le token est encore valide
          const decoded = decodeToken(storedToken);
          if (decoded && !isTokenExpired(storedToken)) {
            setToken(storedToken);
            setRefreshToken(storedRefreshToken);
            setUser(JSON.parse(storedUser));
          } else {
            // Token expiré, nettoyer le localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation de l'auth:", error);
        // Nettoyer en cas d'erreur
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Fonction de connexion
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la connexion");
      }

      // Stocker les informations d'authentification
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setRefreshToken(data.refreshToken);
      setUser(data.user);
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  // Mettre à jour les informations utilisateur
  const updateUser = (userData: Partial<UserProfile>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        refreshToken,
        isLoading,
        isAuthenticated,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook pour utiliser l'authentification
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Fonction helper pour vérifier si un token est expiré
function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  return decoded.exp * 1000 < Date.now();
}
