import { NextRequest, NextResponse } from "next/server";
import TrainingSession from "../../../models/TrainingSession";
import {
  EducationService,
  TRAINING_PROGRAMS,
  BEHAVIORAL_TIPS,
} from "../../../services/education";
import connectDB from "@/lib/db";
import { authenticateUser } from "@/lib/auth";

// GET - Récupérer les programmes d'entraînement et les statistiques
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateUser(request);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const petId = searchParams.get("petId");
    const type = searchParams.get("type") || "programs";

    await connectDB();

    if (type === "programs") {
      // Récupérer les programmes avec progression
      let programsWithProgress = [...TRAINING_PROGRAMS];

      if (petId) {
        // Calculer la progression pour chaque programme
        const sessions = await TrainingSession.find({
          userId: authResult.userId,
          petId: petId,
        });

        programsWithProgress = TRAINING_PROGRAMS.map((program) => {
          const progress = EducationService.calculateProgress(
            sessions,
            program.id
          );
          const completedLessons = new Set(
            sessions
              .filter((s) => s.programId === program.id && s.completedAt)
              .map((s) => s.lessonId)
          ).size;

          return {
            ...program,
            completedLessons,
            progress,
          };
        });
      }

      return NextResponse.json({
        programs: programsWithProgress,
        tips: BEHAVIORAL_TIPS,
      });
    }

    if (type === "stats" && petId) {
      // Statistiques de progression
      const sessions = await TrainingSession.find({
        userId: authResult.userId,
        petId: petId,
      }).sort({ startedAt: -1 });

      const stats = {
        totalSessions: sessions.length,
        totalTrainingTime: sessions.reduce((sum, s) => sum + s.duration, 0),
        completedSessions: sessions.filter((s) => s.completedAt).length,
        averageScore: sessions
          .filter((s) => s.score)
          .reduce((sum, s, _, arr) => {
            return arr.length > 0 ? sum + (s.score || 0) / arr.length : 0;
          }, 0),
        lastSessionDate: sessions[0]?.startedAt,
        programStats: TRAINING_PROGRAMS.map((program) => {
          const progress = EducationService.calculateProgress(
            sessions,
            program.id
          );
          const programSessions = sessions.filter(
            (s) => s.programId === program.id
          );
          const completedLessons = new Set(
            programSessions.filter((s) => s.completedAt).map((s) => s.lessonId)
          ).size;

          return {
            programId: program.id,
            programName: program.name,
            progress,
            completedLessons,
            totalLessons: program.totalLessons,
            lastSession: programSessions[0]?.startedAt,
          };
        }),
      };

      return NextResponse.json({ stats });
    }

    if (type === "schedule") {
      // Générer un planning d'entraînement
      const activePrograms = [
        "obedience-basic",
        "leash-training",
        "socialization",
      ];
      const schedule =
        EducationService.generateTrainingSchedule(activePrograms);

      return NextResponse.json({ schedule });
    }

    return NextResponse.json(
      { error: "Type de requête invalide" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Erreur API training:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST - Créer une nouvelle session d'entraînement
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateUser(request);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { petId, programId, lessonId, duration, score, notes, difficulty } =
      body;

    if (!petId || !programId || !lessonId || !duration) {
      return NextResponse.json(
        {
          error:
            "Données manquantes: petId, programId, lessonId et duration sont requis",
        },
        { status: 400 }
      );
    }

    // Vérifier que le programme et la leçon existent
    const lesson = EducationService.getLessonById(programId, lessonId);
    if (!lesson) {
      return NextResponse.json(
        { error: "Programme ou leçon introuvable" },
        { status: 404 }
      );
    }

    await connectDB();

    const session = new TrainingSession({
      userId: authResult.userId,
      petId,
      programId,
      lessonId,
      startedAt: new Date(),
      completedAt: new Date(), // Session terminée immédiatement
      duration,
      score: score || null,
      notes: notes || "",
      difficulty: difficulty || "medium",
    });

    await session.save();

    return NextResponse.json({
      message: "Session enregistrée avec succès",
      session: {
        id: session._id,
        programId: session.programId,
        lessonId: session.lessonId,
        duration: session.duration,
        score: session.score,
        completedAt: session.completedAt,
      },
    });
  } catch (error) {
    console.error("Erreur création session:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
