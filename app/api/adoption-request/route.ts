import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  console.log("API adoption-request POST called"); // ✅ Log 1

  try {
    const { name, email, phone, animal, message } = await req.json();
    console.log("Payload reçu:", { name, email, phone, animal, message }); // ✅ Log 2

    if (!name || !email || !phone || !animal || !message) {
      console.log("Erreur: tous les champs sont requis");
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // envoie vers toi
      subject: `Nouvelle demande d’adoption pour ${animal}`,
      text: `
Nouvelle demande d’adoption reçue :

Nom : ${name}
Email : ${email}
Téléphone : ${phone}
Animal choisi : ${animal}

Message :
${message}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé:", info); // ✅ Log 3

    return NextResponse.json({
      success: true,
      message: "Email envoyé avec succès.",
    });
  } catch (error) {
    console.error("Erreur envoi email:", error); // ✅ Log 4
    return NextResponse.json(
      { error: "Erreur lors de l’envoi de l’email." },
      { status: 500 }
    );
  }
}
