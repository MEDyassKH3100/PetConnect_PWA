import mongoose, { Schema, Document } from "mongoose";

// Interface pour une leçon individuelle
export interface ILesson {
  id: string;
  title: string;
  description: string;
  duration: number; // en minutes
  difficulty: "beginner" | "intermediate" | "advanced";
  instructions: string[];
  tips: string[];
  completed: boolean;
  completedAt?: Date;
  score?: number; // 0-100
}

// Interface pour un programme d'entraînement
export interface ITrainingProgram {
  id: string;
  name: string;
  category:
    | "obedience"
    | "leash"
    | "tricks"
    | "socialization"
    | "housetraining";
  description: string;
  icon: string;
  totalLessons: number;
  completedLessons: number;
  progress: number; // 0-100
  lessons: ILesson[];
  estimatedWeeks: number;
  difficulty: "beginner" | "intermediate" | "advanced";
}

// Interface pour une session d'entraînement
export interface ITrainingSession extends Document {
  userId: mongoose.Types.ObjectId;
  petId: mongoose.Types.ObjectId;
  programId: string;
  lessonId: string;
  startedAt: Date;
  completedAt?: Date;
  duration: number; // durée réelle en minutes
  score?: number; // 0-100
  notes?: string;
  difficulty: "easy" | "medium" | "hard";
  nextSessionDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Interface pour les statistiques de progression
export interface IProgressStats {
  petId: string;
  programs: {
    [programId: string]: {
      progress: number;
      completedLessons: number;
      totalLessons: number;
      lastSessionDate?: Date;
      averageScore?: number;
    };
  };
  totalSessionsCompleted: number;
  totalTrainingTime: number; // en minutes
  currentStreak: number; // jours consécutifs
  longestStreak: number;
  lastSessionDate?: Date;
}

// Schéma MongoDB pour les sessions d'entraînement
const TrainingSessionSchema = new Schema<ITrainingSession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    petId: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
    programId: { type: String, required: true },
    lessonId: { type: String, required: true },
    startedAt: { type: Date, required: true },
    completedAt: { type: Date },
    duration: { type: Number, required: true },
    score: { type: Number, min: 0, max: 100 },
    notes: { type: String },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    nextSessionDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Index pour optimiser les requêtes
TrainingSessionSchema.index({ userId: 1, petId: 1 });
TrainingSessionSchema.index({ programId: 1, lessonId: 1 });
TrainingSessionSchema.index({ startedAt: -1 });

export default mongoose.models.TrainingSession ||
  mongoose.model<ITrainingSession>("TrainingSession", TrainingSessionSchema);
