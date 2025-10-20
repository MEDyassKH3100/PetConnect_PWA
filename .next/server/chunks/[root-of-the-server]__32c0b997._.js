module.exports = [
"[project]/Documents/GitHub/PetConnect_PWA/.next-internal/server/app/api/auth/register/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
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
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/mongoose [external] (mongoose, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}),
"[project]/Documents/GitHub/PetConnect_PWA/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/petcareverse";
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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/Documents/GitHub/PetConnect_PWA/models/User.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserService",
    ()=>UserService,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/PetConnect_PWA/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/PetConnect_PWA/lib/db.ts [app-route] (ecmascript)");
;
;
;
const UserSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    firstName: {
        type: String,
        required: [
            true,
            "Le prénom est obligatoire"
        ],
        trim: true,
        maxlength: [
            50,
            "Le prénom ne peut pas dépasser 50 caractères"
        ]
    },
    lastName: {
        type: String,
        required: [
            true,
            "Le nom est obligatoire"
        ],
        trim: true,
        maxlength: [
            50,
            "Le nom ne peut pas dépasser 50 caractères"
        ]
    },
    email: {
        type: String,
        required: [
            true,
            "L'email est obligatoire"
        ],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Veuillez entrer un email valide"
        ]
    },
    password: {
        type: String,
        required: [
            true,
            "Le mot de passe est obligatoire"
        ],
        minlength: [
            6,
            "Le mot de passe doit contenir au moins 6 caractères"
        ],
        select: false
    },
    phone: {
        type: String,
        maxlength: [
            20,
            "Le téléphone ne peut pas dépasser 20 caractères"
        ]
    },
    address: {
        type: String,
        maxlength: [
            200,
            "L'adresse ne peut pas dépasser 200 caractères"
        ]
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: [
            "user",
            "admin",
            "vet"
        ],
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        select: false
    },
    otpExpires: {
        type: Date,
        select: false
    },
    resetPasswordToken: {
        type: String,
        select: false
    },
    resetPasswordExpires: {
        type: Date,
        select: false
    }
}, {
    timestamps: true
});
// Hacher le mot de passe avant de sauvegarder
UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].genSalt(10);
        this.password = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});
// Méthode pour comparer les mots de passe
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(candidatePassword, this.password);
};
class UserService {
    static async register(userData) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(); // Assurer la connexion
        // Créer le modèle après la connexion
        const User = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.User || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("User", UserSchema);
        const existingUser = await User.findOne({
            email: userData.email
        });
        if (existingUser) throw new Error("Cet email est déjà utilisé");
        const user = new User(userData);
        await user.save();
        return user;
    }
}
let User;
try {
    User = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.User;
} catch  {
    User = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("User", UserSchema);
}
const __TURBOPACK__default__export__ = User;
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
"[project]/Documents/GitHub/PetConnect_PWA/services/userService.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserService",
    ()=>UserService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/PetConnect_PWA/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/PetConnect_PWA/models/User.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/PetConnect_PWA/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
;
;
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
class UserService {
    // 1. Register (Inscription)
    static async register(userData) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const existingUser = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            email: userData.email
        });
        if (existingUser) {
            throw new Error("Cet email est déjà utilisé");
        }
        const user = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](userData);
        await user.save();
        return user;
    }
    // 2. Login (Connexion)
    static async login(email, password) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            email
        }).select("+password");
        if (!user) {
            throw new Error("Email ou mot de passe incorrect");
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error("Email ou mot de passe incorrect");
        }
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign({
            userId: user._id,
            email: user.email,
            role: user.role
        }, JWT_SECRET, {
            expiresIn: "7d"
        });
        return {
            user,
            token
        };
    }
    // 3. Update Profile (Mettre à jour le profil)
    static async updateProfile(userId, updateData) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findByIdAndUpdate(userId, updateData, {
            new: true,
            runValidators: true
        });
    }
    // 4. Forget Password (Demander réinitialisation de mot de passe)
    static async forgetPassword(email) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            email
        });
        if (!user) {
            throw new Error("Aucun utilisateur trouvé avec cet email");
        }
        const resetToken = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(32).toString("hex");
        const hashedToken = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(resetToken).digest("hex");
        const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = expires;
        await user.save();
        // Ici, vous pourriez intégrer un service d'email pour envoyer le token par mail
        // Exemple : await sendEmail(email, 'Réinitialisation de mot de passe', `Votre token: ${resetToken}`);
        return {
            resetToken,
            message: "Un token de réinitialisation a été généré (à envoyer par email)"
        };
    }
    // 5. Verify OTP (Vérifier OTP reçu par email)
    static async verifyOTP(email, otp) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            email,
            otp,
            otpExpires: {
                $gt: new Date()
            }
        });
        if (!user) {
            throw new Error("OTP invalide ou expiré");
        }
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
        return {
            user,
            message: "Compte vérifié avec succès"
        };
    }
    // 6. Reset Password (Réinitialiser le mot de passe avec token)
    static async resetPassword(token, newPassword) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const hashedToken = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(token).digest("hex");
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: {
                $gt: new Date()
            }
        }).select("+password");
        if (!user) {
            throw new Error("Token invalide ou expiré");
        }
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        return {
            user,
            message: "Mot de passe réinitialisé avec succès"
        };
    }
    // 7. Change Password (Changer le mot de passe actuel)
    static async changePassword(userId, currentPassword, newPassword) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findById(userId).select("+password");
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }
        const isCurrentPasswordValid = await user.comparePassword(currentPassword);
        if (!isCurrentPasswordValid) {
            throw new Error("Mot de passe actuel incorrect");
        }
        user.password = newPassword;
        await user.save();
        return {
            user,
            message: "Mot de passe changé avec succès"
        };
    }
    // 8. Delete Profile (Supprimer le profil)
    static async deleteProfile(userId) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findByIdAndDelete(userId);
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }
        return {
            message: "Profil supprimé avec succès"
        };
    }
    // Méthodes utilitaires supplémentaires (optionnelles)
    static async getUserById(userId) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findById(userId);
    }
    static async getAllUsers() {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
            createdAt: -1
        });
    }
}
}),
"[project]/Documents/GitHub/PetConnect_PWA/app/api/auth/register/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/PetConnect_PWA/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$services$2f$userService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/PetConnect_PWA/services/userService.ts [app-route] (ecmascript)"); // Chemin vers votre service
;
;
async function POST(request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, password } = body;
        // Validation basique
        if (!firstName || !lastName || !email || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Tous les champs sont requis"
            }, {
                status: 400
            });
        }
        // Appeler le service
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$services$2f$userService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UserService"].register({
            firstName,
            lastName,
            email,
            password
        });
        // Succès
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Inscription réussie",
            user
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$PetConnect_PWA$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || "Erreur serveur"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__32c0b997._.js.map