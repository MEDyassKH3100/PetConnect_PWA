module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/mongoose [external] (mongoose, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}),
"[project]/models/TrainingSession.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
// Schéma MongoDB pour les sessions d'entraînement
const TrainingSessionSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    userId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"].Types.ObjectId,
        ref: "User",
        required: true
    },
    petId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"].Types.ObjectId,
        ref: "Pet",
        required: true
    },
    programId: {
        type: String,
        required: true
    },
    lessonId: {
        type: String,
        required: true
    },
    startedAt: {
        type: Date,
        required: true
    },
    completedAt: {
        type: Date
    },
    duration: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        min: 0,
        max: 100
    },
    notes: {
        type: String
    },
    difficulty: {
        type: String,
        enum: [
            "easy",
            "medium",
            "hard"
        ],
        required: true
    },
    nextSessionDate: {
        type: Date
    }
}, {
    timestamps: true
});
// Index pour optimiser les requêtes
TrainingSessionSchema.index({
    userId: 1,
    petId: 1
});
TrainingSessionSchema.index({
    programId: 1,
    lessonId: 1
});
TrainingSessionSchema.index({
    startedAt: -1
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.TrainingSession || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("TrainingSession", TrainingSessionSchema);
}),
"[project]/services/education.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BEHAVIORAL_TIPS",
    ()=>BEHAVIORAL_TIPS,
    "EducationService",
    ()=>EducationService,
    "TRAINING_PROGRAMS",
    ()=>TRAINING_PROGRAMS
]);
const TRAINING_PROGRAMS = [
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
                    "Répétez 10-15 fois par session"
                ],
                tips: [
                    "Soyez patient et constant",
                    "Utilisez des friandises de haute valeur",
                    "Pratiquez avant les repas quand il a faim"
                ],
                completed: false
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
                    'Dites "Couché" quand il commence à se baisser'
                ],
                tips: [
                    "Ne forcez jamais physiquement",
                    "Utilisez le leurre de la friandise"
                ],
                completed: false
            }
        ]
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
                    "Récompensez le comportement calme"
                ],
                tips: [
                    "Associez la laisse à des expériences positives",
                    "Ne tirez jamais sur la laisse"
                ],
                completed: false
            }
        ]
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
                    "Levez lentement la friandise vers le haut"
                ],
                tips: [
                    'Assurez-vous que votre chien maîtrise "assis"',
                    "Commencez par de courtes durées"
                ],
                completed: false
            }
        ]
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
                    "Rencontrez-vous dans un terrain neutre"
                ],
                tips: [
                    "Commencez par de courtes rencontres",
                    "Restez calme et détendu"
                ],
                completed: false
            }
        ]
    }
];
const BEHAVIORAL_TIPS = [
    {
        id: "excessive-barking",
        title: "Aboiements excessifs",
        description: "Les aboiements peuvent être causés par l'ennui ou l'anxiété. Essayez d'augmenter l'exercice quotidien et offrez des jouets d'enrichissement mental.",
        category: "behavior",
        severity: "medium",
        solutions: [
            "Augmentez l'exercice physique quotidien",
            "Fournissez des jouets de stimulation mentale",
            "Ignorez les aboiements d'attention",
            "Récompensez le silence"
        ]
    },
    {
        id: "separation-anxiety",
        title: "Anxiété de séparation",
        description: "Pratiquez des départs courts et progressifs. Ne faites pas de grands adieux ou retours émotionnels.",
        category: "anxiety",
        severity: "high",
        solutions: [
            "Pratiquez des départs très courts",
            "Créez des associations positives avec la solitude",
            "Laissez des jouets spéciaux pour l'absence",
            "Consultez un vétérinaire si sévère"
        ]
    },
    {
        id: "object-chewing",
        title: "Mâchonnement d'objets",
        description: "Fournissez des alternatives appropriées comme des jouets à mâcher.",
        category: "behavior",
        severity: "medium",
        solutions: [
            "Fournissez des jouets à mâcher appropriés",
            "Rangez les objets tentants",
            "Récompensez l'utilisation des bons jouets"
        ]
    }
];
class EducationService {
    // Récupérer tous les programmes
    static getAllPrograms() {
        return TRAINING_PROGRAMS;
    }
    // Récupérer un programme par ID
    static getProgramById(programId) {
        return TRAINING_PROGRAMS.find((program)=>program.id === programId);
    }
    // Récupérer une leçon spécifique
    static getLessonById(programId, lessonId) {
        const program = this.getProgramById(programId);
        return program?.lessons.find((lesson)=>lesson.id === lessonId);
    }
    // Calculer les statistiques de progression
    static calculateProgress(sessions, programId) {
        const program = this.getProgramById(programId);
        if (!program) return 0;
        const completedLessons = new Set(sessions.filter((s)=>s.programId === programId && s.completedAt).map((s)=>s.lessonId)).size;
        return Math.round(completedLessons / program.totalLessons * 100);
    }
    // Générer des recommandations personnalisées
    static getPersonalizedRecommendations(petType, age) {
        const recommendations = [];
        if (age < 1) {
            recommendations.push("Concentrez-vous sur la socialisation précoce");
            recommendations.push("Commencez par des sessions très courtes (5-10 minutes)");
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
    static generateTrainingSchedule(programs) {
        const schedule = [];
        const days = [
            "Lundi",
            "Mercredi",
            "Vendredi"
        ];
        programs.forEach((programId, index)=>{
            const program = this.getProgramById(programId);
            if (program && program.lessons.length > 0) {
                const dayIndex = index % days.length;
                schedule.push({
                    day: days[dayIndex],
                    programId,
                    programName: program.name,
                    lesson: program.lessons[0],
                    duration: program.lessons[0].duration,
                    status: index === 1 ? "Aujourd'hui" : index === 0 ? "Complété" : "À venir"
                });
            }
        });
        return schedule;
    }
    // Obtenir les conseils comportementaux
    static getBehavioralTips() {
        return BEHAVIORAL_TIPS;
    }
    // Rechercher des conseils par catégorie
    static getTipsByCategory(category) {
        return BEHAVIORAL_TIPS.filter((tip)=>tip.category === category);
    }
}
}),
"[project]/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/petconnect";
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
let cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose;
if (!cached) {
    cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose = {
        conn: null,
        promise: null
    };
}
async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            console.log("Connexion à la base de données réussie");
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
const __TURBOPACK__default__export__ = connectDB;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authenticateUser",
    ()=>authenticateUser,
    "getTokenFromCookies",
    ()=>getTokenFromCookies,
    "hasRole",
    ()=>hasRole,
    "isAdmin",
    ()=>isAdmin,
    "isVet",
    ()=>isVet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
;
const JWT_SECRET = process.env.JWT_SECRET || "petconnect_super_secret_key_change_this_in_production_minimum_32_characters_random";
async function authenticateUser(request) {
    try {
        // Récupérer le token depuis les headers
        const authHeader = request.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("❌ Aucun token fourni");
            return {
                authenticated: false,
                error: "Token manquant"
            };
        }
        // Extraire le token
        const token = authHeader.substring(7); // Enlever "Bearer "
        // Vérifier et décoder le token
        const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, JWT_SECRET);
        // Le token peut avoir soit 'userId' soit 'id'
        const userId = decoded.userId || decoded.id;
        if (!userId) {
            console.log("❌ Token invalide: pas d'userId");
            return {
                authenticated: false,
                error: "Token invalide"
            };
        }
        console.log("✅ Utilisateur authentifié:", userId);
        return {
            authenticated: true,
            userId,
            email: decoded.email,
            role: decoded.role
        };
    } catch (error) {
        console.error("❌ Erreur authentification:", error.message);
        if (error.name === "TokenExpiredError") {
            return {
                authenticated: false,
                error: "Token expiré"
            };
        }
        if (error.name === "JsonWebTokenError") {
            return {
                authenticated: false,
                error: "Token invalide"
            };
        }
        return {
            authenticated: false,
            error: "Erreur d'authentification"
        };
    }
}
function getTokenFromCookies(request) {
    const token = request.cookies.get("token")?.value;
    return token || null;
}
function hasRole(authResult, requiredRole) {
    return authResult.authenticated && authResult.role === requiredRole;
}
function isAdmin(authResult) {
    return hasRole(authResult, "admin");
}
function isVet(authResult) {
    return hasRole(authResult, "vet");
}
}),
"[project]/app/api/training/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$TrainingSession$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/TrainingSession.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$education$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/education.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-route] (ecmascript)");
;
;
;
;
;
async function GET(request) {
    try {
        const authResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authenticateUser"])(request);
        if (!authResult.authenticated) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Non autorisé"
            }, {
                status: 401
            });
        }
        const { searchParams } = new URL(request.url);
        const petId = searchParams.get("petId");
        const type = searchParams.get("type") || "programs";
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        if (type === "programs") {
            // Récupérer les programmes avec progression
            let programsWithProgress = [
                ...__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$education$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRAINING_PROGRAMS"]
            ];
            if (petId) {
                // Calculer la progression pour chaque programme
                const sessions = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$TrainingSession$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({
                    userId: authResult.userId,
                    petId: petId
                });
                programsWithProgress = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$education$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRAINING_PROGRAMS"].map((program)=>{
                    const progress = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$education$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EducationService"].calculateProgress(sessions, program.id);
                    const completedLessons = new Set(sessions.filter((s)=>s.programId === program.id && s.completedAt).map((s)=>s.lessonId)).size;
                    return {
                        ...program,
                        completedLessons,
                        progress
                    };
                });
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                programs: programsWithProgress,
                tips: __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$education$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BEHAVIORAL_TIPS"]
            });
        }
        if (type === "stats" && petId) {
            // Statistiques de progression
            const sessions = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$TrainingSession$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({
                userId: authResult.userId,
                petId: petId
            }).sort({
                startedAt: -1
            });
            const stats = {
                totalSessions: sessions.length,
                totalTrainingTime: sessions.reduce((sum, s)=>sum + s.duration, 0),
                completedSessions: sessions.filter((s)=>s.completedAt).length,
                averageScore: sessions.filter((s)=>s.score).reduce((sum, s, _, arr)=>{
                    return arr.length > 0 ? sum + (s.score || 0) / arr.length : 0;
                }, 0),
                lastSessionDate: sessions[0]?.startedAt,
                programStats: __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$education$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRAINING_PROGRAMS"].map((program)=>{
                    const progress = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$education$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EducationService"].calculateProgress(sessions, program.id);
                    const programSessions = sessions.filter((s)=>s.programId === program.id);
                    const completedLessons = new Set(programSessions.filter((s)=>s.completedAt).map((s)=>s.lessonId)).size;
                    return {
                        programId: program.id,
                        programName: program.name,
                        progress,
                        completedLessons,
                        totalLessons: program.totalLessons,
                        lastSession: programSessions[0]?.startedAt
                    };
                })
            };
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                stats
            });
        }
        if (type === "schedule") {
            // Générer un planning d'entraînement
            const activePrograms = [
                "obedience-basic",
                "leash-training",
                "socialization"
            ];
            const schedule = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$education$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EducationService"].generateTrainingSchedule(activePrograms);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                schedule
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Type de requête invalide"
        }, {
            status: 400
        });
    } catch (error) {
        console.error("Erreur API training:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Erreur serveur"
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const authResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authenticateUser"])(request);
        if (!authResult.authenticated) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Non autorisé"
            }, {
                status: 401
            });
        }
        const body = await request.json();
        const { petId, programId, lessonId, duration, score, notes, difficulty } = body;
        if (!petId || !programId || !lessonId || !duration) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Données manquantes: petId, programId, lessonId et duration sont requis"
            }, {
                status: 400
            });
        }
        // Vérifier que le programme et la leçon existent
        const lesson = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$education$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EducationService"].getLessonById(programId, lessonId);
        if (!lesson) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Programme ou leçon introuvable"
            }, {
                status: 404
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const session = new __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$TrainingSession$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]({
            userId: authResult.userId,
            petId,
            programId,
            lessonId,
            startedAt: new Date(),
            completedAt: new Date(),
            duration,
            score: score || null,
            notes: notes || "",
            difficulty: difficulty || "medium"
        });
        await session.save();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Session enregistrée avec succès",
            session: {
                id: session._id,
                programId: session.programId,
                lessonId: session.lessonId,
                duration: session.duration,
                score: session.score,
                completedAt: session.completedAt
            }
        });
    } catch (error) {
        console.error("Erreur création session:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Erreur serveur"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e2f7b48b._.js.map