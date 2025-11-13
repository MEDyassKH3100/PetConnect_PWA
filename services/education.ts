import {
  ITrainingProgram,
  ILesson,
  IProgressStats,
} from "../models/TrainingSession";

// Programmes d'entraînement prédéfinis
export const TRAINING_PROGRAMS: ITrainingProgram[] = [
  {
    id: "obedience-basic",
    name: "Obéissance de base",
    category: "obedience",
    description: "Commandes essentielles : assis, couché, reste, viens",
    icon: "GraduationCap",
    totalLessons: 8,
    completedLessons: 0,
    progress: 0,
    estimatedWeeks: 4,
    difficulty: "beginner",
    lessons: [
      {
        id: "obedience-1",
        title: 'Commande "Assis"',
        description: 'Apprendre la commande de base "assis"',
        duration: 15,
        difficulty: "beginner",
        instructions: [
          "Tenez une friandise au-dessus de la tête de votre chien",
          'Dites "Assis" d\'une voix claire et ferme',
          "Levez lentement la friandise vers l'arrière",
          "Dès qu'il s'assoit, récompensez et félicitez",
          "Répétez 10-15 fois par session",
        ],
        tips: [
          "Soyez patient et constant",
          "Utilisez des friandises de haute valeur",
          "Pratiquez avant les repas quand il a faim",
        ],
        completed: false,
      },
      {
        id: "obedience-2",
        title: 'Commande "Couché"',
        description: "Enseigner la position couchée",
        duration: 20,
        difficulty: "beginner",
        instructions: [
          "Commencez avec votre chien en position assise",
          "Tenez une friandise devant son nez",
          "Abaissez lentement la friandise vers le sol",
          'Dites "Couché" quand il commence à se baisser',
        ],
        tips: [
          "Ne forcez jamais physiquement",
          "Utilisez le leurre de la friandise",
        ],
        completed: false,
      },
    ],
  },
  {
    id: "leash-training",
    name: "Marche en laisse",
    category: "leash",
    description: "Techniques pour une marche sans tirer et avec attention",
    icon: "BookOpen",
    totalLessons: 5,
    completedLessons: 0,
    progress: 0,
    estimatedWeeks: 3,
    difficulty: "intermediate",
    lessons: [
      {
        id: "leash-1",
        title: "Habituation à la laisse",
        description: "Familiariser votre chien avec le collier et la laisse",
        duration: 15,
        difficulty: "beginner",
        instructions: [
          "Laissez votre chien sentir et explorer la laisse",
          "Attachez la laisse sans tension",
          "Récompensez le comportement calme",
        ],
        tips: [
          "Associez la laisse à des expériences positives",
          "Ne tirez jamais sur la laisse",
        ],
        completed: false,
      },
    ],
  },
  {
    id: "advanced-tricks",
    name: "Tricks avancés",
    category: "tricks",
    description: "Tours et astuces pour stimuler mentalement votre animal",
    icon: "Trophy",
    totalLessons: 6,
    completedLessons: 0,
    progress: 0,
    estimatedWeeks: 6,
    difficulty: "advanced",
    lessons: [
      {
        id: "tricks-1",
        title: "Faire le beau",
        description: "Apprendre à se dresser sur les pattes arrière",
        duration: 20,
        difficulty: "intermediate",
        instructions: [
          "Commencez avec votre chien en position assise",
          "Tenez une friandise au-dessus de sa tête",
          "Levez lentement la friandise vers le haut",
        ],
        tips: [
          'Assurez-vous que votre chien maîtrise "assis"',
          "Commencez par de courtes durées",
        ],
        completed: false,
      },
    ],
  },
  {
    id: "socialization",
    name: "Socialisation",
    category: "socialization",
    description: "Développer les compétences sociales",
    icon: "Users",
    totalLessons: 4,
    completedLessons: 0,
    progress: 0,
    estimatedWeeks: 8,
    difficulty: "intermediate",
    lessons: [
      {
        id: "social-1",
        title: "Rencontres contrôlées",
        description: "Organiser des rencontres sécurisées",
        duration: 30,
        difficulty: "intermediate",
        instructions: [
          "Choisissez un chien calme et bien socialisé",
          "Rencontrez-vous dans un terrain neutre",
        ],
        tips: [
          "Commencez par de courtes rencontres",
          "Restez calme et détendu",
        ],
        completed: false,
      },
    ],
  },
];

// Conseils comportementaux prédéfinis
export const BEHAVIORAL_TIPS = [
  {
    id: "excessive-barking",
    title: "Aboiements excessifs",
    description:
      "Les aboiements peuvent être causés par l'ennui ou l'anxiété. Essayez d'augmenter l'exercice quotidien et offrez des jouets d'enrichissement mental.",
    category: "behavior",
    severity: "medium",
    solutions: [
      "Augmentez l'exercice physique quotidien",
      "Fournissez des jouets de stimulation mentale",
      "Ignorez les aboiements d'attention",
      "Récompensez le silence",
    ],
  },
  {
    id: "separation-anxiety",
    title: "Anxiété de séparation",
    description:
      "Pratiquez des départs courts et progressifs. Ne faites pas de grands adieux ou retours émotionnels.",
    category: "anxiety",
    severity: "high",
    solutions: [
      "Pratiquez des départs très courts",
      "Créez des associations positives avec la solitude",
      "Laissez des jouets spéciaux pour l'absence",
      "Consultez un vétérinaire si sévère",
    ],
  },
  {
    id: "object-chewing",
    title: "Mâchonnement d'objets",
    description:
      "Fournissez des alternatives appropriées comme des jouets à mâcher.",
    category: "behavior",
    severity: "medium",
    solutions: [
      "Fournissez des jouets à mâcher appropriés",
      "Rangez les objets tentants",
      "Récompensez l'utilisation des bons jouets",
    ],
  },
];

// Classe de service pour l'éducation
export class EducationService {
  // Récupérer tous les programmes
  static getAllPrograms(): ITrainingProgram[] {
    return TRAINING_PROGRAMS;
  }

  // Récupérer un programme par ID
  static getProgramById(programId: string): ITrainingProgram | undefined {
    return TRAINING_PROGRAMS.find((program) => program.id === programId);
  }

  // Récupérer une leçon spécifique
  static getLessonById(
    programId: string,
    lessonId: string
  ): ILesson | undefined {
    const program = this.getProgramById(programId);
    return program?.lessons.find((lesson) => lesson.id === lessonId);
  }

  // Calculer les statistiques de progression
  static calculateProgress(sessions: any[], programId: string): number {
    const program = this.getProgramById(programId);
    if (!program) return 0;

    const completedLessons = new Set(
      sessions
        .filter((s) => s.programId === programId && s.completedAt)
        .map((s) => s.lessonId)
    ).size;

    return Math.round((completedLessons / program.totalLessons) * 100);
  }

  // Générer des recommandations personnalisées
  static getPersonalizedRecommendations(
    petType: string,
    age: number
  ): string[] {
    const recommendations = [];

    if (age < 1) {
      recommendations.push("Concentrez-vous sur la socialisation précoce");
      recommendations.push(
        "Commencez par des sessions très courtes (5-10 minutes)"
      );
    } else if (age > 7) {
      recommendations.push("Adaptez les exercices aux capacités physiques");
      recommendations.push("Privilégiez la stimulation mentale");
    }

    if (petType.toLowerCase().includes("chien")) {
      recommendations.push("La marche en laisse est essentielle");
      recommendations.push("Travaillez le rappel dans des espaces sécurisés");
    }

    return recommendations;
  }

  // Générer un planning d'entraînement
  static generateTrainingSchedule(programs: string[]): any[] {
    const schedule: any[] = [];
    const days = ["Lundi", "Mercredi", "Vendredi"];

    programs.forEach((programId, index) => {
      const program = this.getProgramById(programId);
      if (program && program.lessons.length > 0) {
        const dayIndex = index % days.length;
        schedule.push({
          day: days[dayIndex],
          programId,
          programName: program.name,
          lesson: program.lessons[0],
          duration: program.lessons[0].duration,
          status:
            index === 1 ? "Aujourd'hui" : index === 0 ? "Complété" : "À venir",
        });
      }
    });

    return schedule;
  }

  // Obtenir les conseils comportementaux
  static getBehavioralTips(): typeof BEHAVIORAL_TIPS {
    return BEHAVIORAL_TIPS;
  }

  // Rechercher des conseils par catégorie
  static getTipsByCategory(category: string): typeof BEHAVIORAL_TIPS {
    return BEHAVIORAL_TIPS.filter((tip) => tip.category === category);
  }
}
