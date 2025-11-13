import { NextRequest, NextResponse } from "next/server";
import { listPets, getPetById } from "../../../services/healthService";
import type { Vaccination, MedicalAppointment } from "../../../types/health";

interface UrgentReminder {
  id: string;
  type: "vaccination" | "appointment";
  title: string;
  petName: string;
  date: string;
  daysUntil: number;
  urgencyLevel: "critical" | "warning" | "info";
}

// Health route - GET pour récupérer les rappels urgents
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    if (action === "urgent-reminders") {
      return await getUrgentReminders();
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Erreur API health:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

async function getUrgentReminders(): Promise<NextResponse> {
  try {
    const pets = await listPets();
    const reminders: UrgentReminder[] = [];

    // Parcourir tous les animaux
    for (const pet of pets) {
      try {
        const petHealth = await getPetById(pet.petId);

        // Vérifier les vaccinations
        if (petHealth.vaccinations) {
          for (const vaccination of petHealth.vaccinations) {
            // Inclure tous les vaccins qui ont une date d'échéance ou qui ne sont pas à jour
            if (
              vaccination.nextDueDate ||
              vaccination.status !== "up-to-date"
            ) {
              let daysUntil = 0;
              let dateToUse = vaccination.nextDueDate;

              if (vaccination.nextDueDate) {
                const dueDate = new Date(vaccination.nextDueDate);
                const now = new Date();
                const diffTime = dueDate.getTime() - now.getTime();
                daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              } else {
                // Si pas de nextDueDate mais status pas à jour, considérer comme en retard
                daysUntil = -999; // Très en retard
                dateToUse = vaccination.date; // Utiliser la date du dernier vaccin
              }

              // Inclure les rappels dans les 60 prochains jours ou en retard
              if (daysUntil <= 60) {
                let urgencyLevel: "critical" | "warning" | "info" = "info";
                if (daysUntil <= 0) urgencyLevel = "critical";
                else if (daysUntil <= 7) urgencyLevel = "warning";
                else if (daysUntil <= 30) urgencyLevel = "info";

                reminders.push({
                  id: `vacc-${vaccination.id}`,
                  type: "vaccination",
                  title: `Vaccin ${vaccination.name}`,
                  petName: petHealth.name || "Animal",
                  date: dateToUse || vaccination.date,
                  daysUntil,
                  urgencyLevel,
                });
              }
            }
          }
        }

        // Vérifier les rendez-vous médicaux
        if (petHealth.appointments) {
          for (const appointment of petHealth.appointments) {
            const appointmentDate = new Date(
              `${appointment.date} ${appointment.time || "00:00"}`
            );
            const now = new Date();
            const diffTime = appointmentDate.getTime() - now.getTime();
            const daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // Seulement les rendez-vous dans les 7 prochains jours
            if (daysUntil >= 0 && daysUntil <= 7) {
              let urgencyLevel: "critical" | "warning" | "info" = "info";
              if (daysUntil <= 1) urgencyLevel = "critical";
              else if (daysUntil <= 3) urgencyLevel = "warning";

              reminders.push({
                id: `appt-${appointment.id}`,
                type: "appointment",
                title: appointment.type || "Rendez-vous",
                petName: petHealth.name || "Animal",
                date: appointment.date,
                daysUntil,
                urgencyLevel,
              });
            }
          }
        }
      } catch (petError) {
        console.error(`Erreur pour l'animal ${pet.petId}:`, petError);
        // Continuer avec les autres animaux
      }
    }

    // Trier par urgence puis par date
    const sortedReminders = reminders.sort((a, b) => {
      // D'abord par niveau d'urgence
      const urgencyOrder = { critical: 0, warning: 1, info: 2 };
      const urgencyDiff =
        urgencyOrder[a.urgencyLevel] - urgencyOrder[b.urgencyLevel];
      if (urgencyDiff !== 0) return urgencyDiff;

      // Puis par nombre de jours
      return a.daysUntil - b.daysUntil;
    });

    // Ne pas limiter ici, laisser la Sidebar gérer l'affichage
    // Mais garder un maximum raisonnable pour éviter la surcharge
    const topReminders = sortedReminders.slice(0, 20);

    return NextResponse.json({ reminders: topReminders });
  } catch (error) {
    console.error("Erreur lors de la récupération des rappels urgents:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des rappels" },
      { status: 500 }
    );
  }
}
