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
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/lib/email-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "sendOTPEmail",
    ()=>sendOTPEmail,
    "sendWelcomeEmail",
    ()=>sendWelcomeEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nodemailer/lib/nodemailer.js [app-route] (ecmascript)");
;
console.log("\n📧 ===== CONFIGURATION EMAIL SERVICE =====");
console.log("👤 EMAIL_USER:", process.env.EMAIL_USER || "❌ NON DÉFINI");
console.log("🔑 EMAIL_PASS:", process.env.EMAIL_PASS ? `✅ Défini (${process.env.EMAIL_PASS.length} caractères)` : "❌ NON DÉFINI");
console.log("==========================================\n");
// Configuration du transporteur email
const transporter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
// Vérifier la configuration
transporter.verify((error, success)=>{
    if (error) {
        console.error("❌ Erreur de configuration email:", error);
    } else {
        console.log("✅ Service email prêt à envoyer des messages");
    }
});
// Template HTML pour l'email OTP
const getOTPEmailTemplate = (otp, userName)=>`
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code de vérification PetCareVerse</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #F5F5DC 0%, #FFB8C2 50%, #FF9A3D 100%);">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #F5F5DC 0%, #FFB8C2 50%, #FF9A3D 100%); padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #FFB8C2 0%, #FF9A3D 100%); padding: 40px 20px; text-align: center;">
              <div style="background-color: white; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: inline-block; line-height: 80px;">
                <span style="font-size: 40px;">🐾</span>
              </div>
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">PetCareVerse</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 14px;">Écosystème global de soin animal intelligent</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #333; margin: 0 0 20px; font-size: 24px;">Bonjour ${userName} 🐾</h2>
              <p style="color: #666; margin: 0 0 30px; font-size: 16px; line-height: 1.6;">
                Vous avez demandé à réinitialiser votre mot de passe. Utilisez le code de vérification ci-dessous pour continuer :
              </p>
              
              <!-- OTP Code -->
              <div style="background: linear-gradient(135deg, #FFB8C2 0%, #FF9A3D 100%); border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
                <p style="color: white; margin: 0 0 10px; font-size: 14px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">Votre code de vérification</p>
                <div style="background-color: white; border-radius: 8px; padding: 20px; display: inline-block;">
                  <span style="font-size: 36px; font-weight: bold; color: #FF9A3D; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otp}</span>
                </div>
                <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0; font-size: 13px;">
                  ⏱️ Ce code expire dans <strong>10 minutes</strong>
                </p>
              </div>
              
              <div style="background-color: #FFF3E0; border-left: 4px solid #FF9A3D; padding: 15px; border-radius: 4px; margin: 30px 0;">
                <p style="color: #E65100; margin: 0; font-size: 14px; line-height: 1.6;">
                  <strong>⚠️ Sécurité :</strong> Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email et vérifier la sécurité de votre compte.
                </p>
              </div>
              
              <p style="color: #666; margin: 30px 0 0; font-size: 14px; line-height: 1.6;">
                Besoin d'aide ? Contactez notre équipe support à <a href="mailto:support@petcareverse.com" style="color: #FF9A3D; text-decoration: none;">support@petcareverse.com</a>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #F5F5F5; padding: 30px; text-align: center; border-top: 1px solid #E0E0E0;">
              <p style="color: #999; margin: 0 0 10px; font-size: 12px;">
                © 2024 PetCareVerse. Tous droits réservés.
              </p>
              <p style="color: #999; margin: 0; font-size: 12px;">
                Cet email a été envoyé depuis une adresse qui ne peut pas recevoir de réponses.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
async function sendOTPEmail(email, otp, userName) {
    try {
        console.log("\n📤 ===== ENVOI EMAIL OTP =====");
        console.log("📬 Destinataire:", email);
        console.log("🔢 Code OTP:", otp);
        console.log("👤 Nom utilisateur:", userName);
        console.log("📧 Expéditeur:", process.env.EMAIL_USER);
        const mailOptions = {
            from: `"PetCareVerse" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `🔐 Votre code de vérification PetCareVerse - ${otp}`,
            html: getOTPEmailTemplate(otp, userName),
            text: `Bonjour ${userName},\n\nVotre code de vérification PetCareVerse est : ${otp}\n\nCe code expire dans 10 minutes.\n\nSi vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.\n\nCordialement,\nL'équipe PetCareVerse`
        };
        console.log("🚀 Envoi en cours...");
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email OTP envoyé avec succès!");
        console.log("🆔 Message ID:", info.messageId);
        console.log("📨 Réponse:", info.response);
        console.log("================================\n");
        return {
            success: true,
            message: "Email envoyé avec succès"
        };
    } catch (error) {
        console.error("\n❌ ===== ERREUR ENVOI EMAIL =====");
        console.error("🚫 Type d'erreur:", error.name);
        console.error("📝 Message:", error.message);
        console.error("🔍 Code:", error.code);
        console.error("📊 Stack:", error.stack);
        console.error("================================\n");
        return {
            success: false,
            message: error.message || "Erreur lors de l'envoi de l'email"
        };
    }
}
async function sendWelcomeEmail(email, userName) {
    try {
        const mailOptions = {
            from: `"PetCareVerse" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "🎉 Bienvenue sur PetCareVerse !",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FF9A3D;">Bienvenue ${userName} ! 🐾</h1>
          <p>Merci de vous être inscrit sur PetCareVerse.</p>
          <p>Nous sommes ravis de vous compter parmi nous !</p>
          <p>Cordialement,<br>L'équipe PetCareVerse</p>
        </div>
      `
        };
        await transporter.sendMail(mailOptions);
        return {
            success: true,
            message: "Email de bienvenue envoyé"
        };
    } catch (error) {
        console.error("❌ Erreur email de bienvenue:", error);
        return {
            success: false,
            message: error.message
        };
    }
}
const __TURBOPACK__default__export__ = transporter;
}),
"[project]/app/api/auth/forgot-password/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/User.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/email-service.ts [app-route] (ecmascript)");
;
;
;
;
async function POST(request) {
    try {
        const body = await request.json();
        const { email } = body;
        // Validation de l'email
        if (!email) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "L'email est requis"
            }, {
                status: 400
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Format d'email invalide"
            }, {
                status: 400
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        // Vérifier si l'utilisateur existe
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            email: email.toLowerCase()
        });
        if (!user) {
            // Pour la sécurité, on retourne un succès même si l'email n'existe pas
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Si cet email existe, un code de vérification a été envoyé"
            }, {
                status: 200
            });
        }
        // Générer un OTP à 6 chiffres
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        // Sauvegarder l'OTP dans la base de données
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();
        // Envoyer l'OTP par email
        const emailResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendOTPEmail"])(email, otp, `${user.firstName} ${user.lastName}`);
        if (!emailResult.success) {
            console.error("❌ Erreur envoi email:", emailResult.message);
        // On continue quand même pour ne pas révéler si l'email existe
        } else {
            console.log(`✅ OTP envoyé par email à ${email}`);
        }
        // En développement, logger l'OTP dans la console
        if ("TURBOPACK compile-time truthy", 1) {
            console.log(`📧 OTP pour ${email}: ${otp}`);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Un code de vérification a été envoyé à votre email",
            // En développement uniquement, retourner l'OTP
            ...("TURBOPACK compile-time value", "development") === "development" && {
                otp
            }
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Erreur forgot password:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || "Erreur serveur"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__764c770d._.js.map