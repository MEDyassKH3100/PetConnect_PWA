import { UserService } from "@/services/userService";
import { authenticateUser } from "@/lib/auth-server";
import { NextRequest, NextResponse } from "next/server";

// Interface simplifiée pour les données utilisateur
interface UserProfileData {
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

export async function GET(request: NextRequest) {
  try {
    // Authentifier l'utilisateur
    const user = await authenticateUser(request);

    // Récupérer les informations complètes de l'utilisateur
    const userProfile = await UserService.getUserById(user.id);

    if (!userProfile) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Créer une réponse sécurisée et simplifiée (sans les méthodes Mongoose)
    const userData: UserProfileData = {
      _id: userProfile._id.toString(),
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
      phone: userProfile.phone,
      address: userProfile.address,
      avatar: userProfile.avatar,
      role: userProfile.role,
      isVerified: userProfile.isVerified,
      createdAt: userProfile.createdAt,
      updatedAt: userProfile.updatedAt,
    };

    return NextResponse.json({
      message: "Profil récupéré avec succès",
      user: userData,
    });
  } catch (error: any) {
    console.error("Erreur récupération profil:", error);

    if (error.message.includes("Token")) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Authentifier l'utilisateur
    const user = await authenticateUser(request);
    const body = await request.json();

    const { firstName, lastName, phone, address, avatar } = body;

    // Mettre à jour le profil
    const updatedUser = await UserService.updateProfile(user.id, {
      firstName,
      lastName,
      phone,
      address,
      avatar,
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Erreur lors de la mise à jour" },
        { status: 400 }
      );
    }

    // Créer une réponse sécurisée et simplifiée
    const userData: UserProfileData = {
      _id: updatedUser._id.toString(),
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      avatar: updatedUser.avatar,
      role: updatedUser.role,
      isVerified: updatedUser.isVerified,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };

    return NextResponse.json({
      message: "Profil mis à jour avec succès",
      user: userData,
    });
  } catch (error: any) {
    console.error("Erreur mise à jour profil:", error);

    if (error.message.includes("Token")) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
