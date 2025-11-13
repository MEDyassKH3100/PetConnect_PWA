import nodemailer from "nodemailer";

console.log("\n📧 ===== CONFIGURATION EMAIL SERVICE =====");
console.log("👤 EMAIL_USER:", process.env.EMAIL_USER || "❌ NON DÉFINI");
console.log(
  "🔑 EMAIL_PASS:",
  process.env.EMAIL_PASS
    ? `✅ Défini (${process.env.EMAIL_PASS.length} caractères)`
    : "❌ NON DÉFINI"
);
console.log("==========================================\n");

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Vérifier la configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Erreur de configuration email:", error);
  } else {
    console.log("✅ Service email prêt à envoyer des messages");
  }
});

// Template HTML pour l'email OTP
const getOTPEmailTemplate = (otp: string, userName: string) => `
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

// Fonction pour envoyer l'OTP par email
export async function sendOTPEmail(
  email: string,
  otp: string,
  userName: string
): Promise<{ success: boolean; message: string }> {
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
      text: `Bonjour ${userName},\n\nVotre code de vérification PetCareVerse est : ${otp}\n\nCe code expire dans 10 minutes.\n\nSi vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.\n\nCordialement,\nL'équipe PetCareVerse`,
    };

    console.log("🚀 Envoi en cours...");
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email OTP envoyé avec succès!");
    console.log("🆔 Message ID:", info.messageId);
    console.log("📨 Réponse:", info.response);
    console.log("================================\n");

    return {
      success: true,
      message: "Email envoyé avec succès",
    };
  } catch (error: any) {
    console.error("\n❌ ===== ERREUR ENVOI EMAIL =====");
    console.error("🚫 Type d'erreur:", error.name);
    console.error("📝 Message:", error.message);
    console.error("🔍 Code:", error.code);
    console.error("📊 Stack:", error.stack);
    console.error("================================\n");

    return {
      success: false,
      message: error.message || "Erreur lors de l'envoi de l'email",
    };
  }
}

// Fonction pour envoyer un email de bienvenue
export async function sendWelcomeEmail(
  email: string,
  userName: string
): Promise<{ success: boolean; message: string }> {
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
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email de bienvenue envoyé" };
  } catch (error: any) {
    console.error("❌ Erreur email de bienvenue:", error);
    return { success: false, message: error.message };
  }
}

export default transporter;
