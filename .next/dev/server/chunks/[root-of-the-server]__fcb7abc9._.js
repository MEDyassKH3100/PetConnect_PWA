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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/models/User.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
;
;
const UserSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email invalide"
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    phone: {
        type: String,
        maxlength: 20
    },
    address: {
        type: String,
        maxlength: 200
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
// Hash password before saving
UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    const salt = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].genSalt(10);
    this.password = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(this.password, salt);
    next();
});
// Compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(candidatePassword, this.password);
};
const User = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.User || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("User", UserSchema);
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
"[project]/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Client-safe auth utilities (no JWT verification)
__turbopack_context__.s([
    "decodeToken",
    ()=>decodeToken,
    "extractToken",
    ()=>extractToken,
    "extractTokenFromCookies",
    ()=>extractTokenFromCookies,
    "extractTokenFromHeader",
    ()=>extractTokenFromHeader,
    "isTokenExpired",
    ()=>isTokenExpired
]);
function extractTokenFromHeader(request) {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }
    return authHeader.substring(7); // Remove "Bearer " prefix
}
function extractTokenFromCookies(request) {
    const token = request.cookies.get("token")?.value;
    return token || null;
}
function extractToken(request) {
    // Priorité au header Authorization
    const headerToken = extractTokenFromHeader(request);
    if (headerToken) return headerToken;
    // Fallback sur les cookies
    return extractTokenFromCookies(request);
}
function isTokenExpired(token) {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    return decoded.exp * 1000 < Date.now();
}
function decodeToken(token) {
    try {
        // Décoder manuellement le JWT sans bibliothèque (base64)
        const parts = token.split(".");
        if (parts.length !== 3) return null;
        const payload = parts[1];
        const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
        return decoded;
    } catch (error) {
        return null;
    }
} // NOTE: Les fonctions suivantes ont été déplacées vers lib/auth-server.ts
 // car elles nécessitent jsonwebtoken qui ne fonctionne que côté serveur:
 // - generateToken
 // - verifyToken
 // - authenticateUser
 // - generateRefreshToken
 // - verifyRefreshToken
}),
"[project]/lib/auth-server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authenticateUser",
    ()=>authenticateUser,
    "generateRefreshToken",
    ()=>generateRefreshToken,
    "generateToken",
    ()=>generateToken,
    "verifyRefreshToken",
    ()=>verifyRefreshToken,
    "verifyToken",
    ()=>verifyToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-route] (ecmascript)");
;
;
// Fonctions pour obtenir JWT_SECRET et JWT_EXPIRES_IN
function getJWTSecret() {
    return process.env.JWT_SECRET || "dev_fallback_secret_key_minimum_32_characters_for_security";
}
function getJWTExpiresIn() {
    return process.env.JWT_EXPIRES_IN || "7d";
}
function generateToken(payload) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(payload, getJWTSecret(), {
        expiresIn: getJWTExpiresIn(),
        issuer: "PetCareVerse",
        audience: "PetCareVerse-Users"
    });
}
function verifyToken(token) {
    try {
        const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, getJWTSecret(), {
            issuer: "PetCareVerse",
            audience: "PetCareVerse-Users"
        });
        return decoded;
    } catch (error) {
        throw new Error("Token invalide ou expiré");
    }
}
function authenticateUser(request) {
    // Essayer d'extraire le token depuis header ou cookies
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractToken"])(request);
    if (!token) {
        throw new Error("Token d'authentification requis");
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTokenExpired"])(token)) {
        throw new Error("Token expiré");
    }
    const decoded = verifyToken(token);
    return {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role
    };
}
function generateRefreshToken(payload) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(payload, getJWTSecret() + "_REFRESH", {
        expiresIn: "30d",
        issuer: "PetCareVerse",
        audience: "PetCareVerse-Refresh"
    });
}
function verifyRefreshToken(token) {
    try {
        const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, getJWTSecret() + "_REFRESH", {
            issuer: "PetCareVerse",
            audience: "PetCareVerse-Refresh"
        });
        return decoded;
    } catch (error) {
        throw new Error("Refresh token invalide ou expiré");
    }
}
}),
"[project]/services/userService.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserService",
    ()=>UserService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/User.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
;
;
class UserService {
    // 1. Register (Inscription)
    static async register(userData) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        // Vérifier que l'email n'existe pas déjà
        const existingUser = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            email: userData.email.toLowerCase()
        });
        if (existingUser) {
            throw new Error("Cet email est déjà utilisé");
        }
        // Validation supplémentaire
        if (userData.password.length < 6) {
            throw new Error("Le mot de passe doit contenir au moins 6 caractères");
        }
        const user = new __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]({
            ...userData,
            email: userData.email.toLowerCase()
        });
        await user.save();
        return user;
    }
    // 2. Login (Connexion) - Version optimisée
    static async login(email, password) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            email: email.toLowerCase()
        }).select("+password");
        if (!user) {
            throw new Error("Email ou mot de passe incorrect");
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error("Email ou mot de passe incorrect");
        }
        // Générer les tokens avec les utilitaires sécurisés
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateToken"])({
            userId: user._id.toString(),
            email: user.email,
            role: user.role
        });
        const refreshToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateRefreshToken"])({
            userId: user._id.toString(),
            email: user.email,
            role: user.role
        });
        return {
            user,
            token,
            refreshToken
        };
    }
    // 3. Update Profile (Mettre à jour le profil)
    static async updateProfile(userId, updateData) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findByIdAndUpdate(userId, updateData, {
            new: true,
            runValidators: true
        });
    }
    // 4. Forget Password (Demander réinitialisation de mot de passe)
    static async forgetPassword(email) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            email: email.toLowerCase()
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
        return {
            resetToken,
            message: "Un token de réinitialisation a été généré (à envoyer par email)"
        };
    }
    // 5. Generate OTP (Générer un OTP pour forgot password)
    static async generateOTP(email) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            email: email.toLowerCase()
        });
        if (!user) {
            throw new Error("Aucun utilisateur trouvé avec cet email");
        }
        // Générer un OTP à 6 chiffres
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();
        return {
            otp,
            message: "Un code OTP a été généré"
        };
    }
    // 6. Verify OTP (Vérifier OTP reçu par email)
    static async verifyOTP(email, otp) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            email: email.toLowerCase()
        }).select("+otp +otpExpires");
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }
        if (!user.otp || !user.otpExpires) {
            throw new Error("Aucun OTP n'a été généré pour cet utilisateur");
        }
        if (user.otp !== otp) {
            throw new Error("OTP invalide");
        }
        if (user.otpExpires < new Date()) {
            throw new Error("OTP expiré");
        }
        // Générer un token de réinitialisation
        const resetToken = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(32).toString("hex");
        const hashedToken = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(resetToken).digest("hex");
        const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = expires;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
        return {
            user,
            resetToken,
            message: "OTP vérifié avec succès"
        };
    }
    // 7. Reset Password (Réinitialiser le mot de passe avec token)
    static async resetPassword(token, newPassword) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const hashedToken = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(token).digest("hex");
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: {
                $gt: new Date()
            }
        }).select("+password");
        if (!user) {
            throw new Error("Token invalide ou expiré");
        }
        // Validation du nouveau mot de passe
        if (newPassword.length < 6) {
            throw new Error("Le mot de passe doit contenir au moins 6 caractères");
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
    // 8. Change Password (Changer le mot de passe actuel)
    static async changePassword(userId, currentPassword, newPassword) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findById(userId).select("+password");
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }
        const isCurrentPasswordValid = await user.comparePassword(currentPassword);
        if (!isCurrentPasswordValid) {
            throw new Error("Mot de passe actuel incorrect");
        }
        // Validation du nouveau mot de passe
        if (newPassword.length < 6) {
            throw new Error("Le mot de passe doit contenir au moins 6 caractères");
        }
        user.password = newPassword;
        await user.save();
        return {
            user,
            message: "Mot de passe changé avec succès"
        };
    }
    // 9. Delete Profile (Supprimer le profil)
    static async deleteProfile(userId) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findByIdAndDelete(userId);
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }
        return {
            message: "Profil supprimé avec succès"
        };
    }
    // 10. Get User by ID (Récupérer un utilisateur par ID)
    static async getUserById(userId) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findById(userId);
    }
    // 11. Get All Users (Admin only)
    static async getAllUsers() {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
            createdAt: -1
        });
    }
    // 12. Get User by Email
    static async getUserByEmail(email) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            email: email.toLowerCase()
        });
    }
    // 13. Update User Role (Admin only)
    static async updateUserRole(userId, role) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findByIdAndUpdate(userId, {
            role
        }, {
            new: true,
            runValidators: true
        });
    }
}
}),
"[project]/app/api/auth/reset-password/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$userService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/userService.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const body = await request.json();
        const { token, password } = body;
        console.log("\n🔐 ===== RÉINITIALISATION MOT DE PASSE =====");
        console.log("🆔 Token reçu:", token);
        console.log("🔑 Nouveau mot de passe:", password ? `✅ Fourni (${password.length} caractères)` : "❌ Manquant");
        // Validation
        if (!token || !password) {
            console.log("❌ Validation échouée: token ou mot de passe manquant");
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Token et nouveau mot de passe sont requis"
            }, {
                status: 400
            });
        }
        if (password.length < 6) {
            console.log("❌ Validation échouée: mot de passe trop court");
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Le mot de passe doit contenir au moins 6 caractères"
            }, {
                status: 400
            });
        }
        console.log("🚀 Appel UserService.resetPassword...");
        // Réinitialiser le mot de passe avec le service
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$userService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UserService"].resetPassword(token, password);
        console.log("✅ Mot de passe réinitialisé avec succès!");
        console.log("==========================================\n");
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: result.message,
            success: true
        }, {
            status: 200
        });
    } catch (error) {
        console.error("\n❌ ===== ERREUR RÉINITIALISATION =====");
        console.error("🚫 Message:", error.message);
        console.error("📊 Stack:", error.stack);
        console.error("==========================================\n");
        if (error.message.includes("invalide") || error.message.includes("expiré")) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Token invalide ou expiré"
            }, {
                status: 401
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || "Erreur serveur"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fcb7abc9._.js.map