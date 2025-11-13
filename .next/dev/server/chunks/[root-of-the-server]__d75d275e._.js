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
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/services/healthService.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HTTPError",
    ()=>HTTPError,
    "addAppointment",
    ()=>addAppointment,
    "addRecord",
    ()=>addRecord,
    "addVaccination",
    ()=>addVaccination,
    "createPet",
    ()=>createPet,
    "deleteAppointment",
    ()=>deleteAppointment,
    "deleteRecord",
    ()=>deleteRecord,
    "deleteVaccination",
    ()=>deleteVaccination,
    "getPetById",
    ()=>getPetById,
    "listPets",
    ()=>listPets,
    "updateVital",
    ()=>updateVital
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const DB_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "data", "health.json");
class HTTPError extends Error {
    status;
    constructor(message, status = 500){
        super(message);
        this.status = status;
        this.name = "HTTPError";
    }
}
async function ensureDB() {
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].access(DB_PATH);
    } catch (e) {
        const init = {
            pets: []
        };
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].mkdir(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(DB_PATH), {
            recursive: true
        });
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(DB_PATH, JSON.stringify(init, null, 2), "utf8");
    }
}
async function readDB() {
    await ensureDB();
    const raw = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].readFile(DB_PATH, "utf8");
    try {
        const parsed = JSON.parse(raw);
        parsed.pets = parsed.pets || [];
        return parsed;
    } catch (e) {
        // If DB is corrupted, reinitialize
        const init = {
            pets: []
        };
        await writeDB(init);
        return init;
    }
}
async function writeDB(db) {
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}
function makeId() {
    return /*TURBOPACK member replacement*/ __turbopack_context__.g.crypto?.randomUUID?.() ?? Date.now().toString();
}
function requirePetId(petId) {
    if (!petId) throw new HTTPError("Missing petId", 400);
}
function sanitizeString(input) {
    if (input === undefined || input === null) return "";
    return String(input).trim();
}
async function listPets() {
    const db = await readDB();
    return (db.pets || []).map((p)=>({
            petId: p.petId,
            name: p.name,
            species: p.species
        }));
}
async function createPet(name, species, customPetId) {
    const n = sanitizeString(name);
    if (!n) throw new HTTPError("Missing name", 400);
    const db = await readDB();
    const petId = customPetId || makeId();
    const newPet = {
        petId,
        name: n,
        species: sanitizeString(species) || "unknown",
        vitalStats: {},
        vaccinations: [],
        appointments: [],
        healthRecords: []
    };
    db.pets = db.pets || [];
    db.pets.push(newPet);
    await writeDB(db);
    return newPet;
}
async function getPetById(petId) {
    requirePetId(petId);
    const db = await readDB();
    const pet = (db.pets || []).find((p)=>p.petId === petId);
    if (!pet) throw new HTTPError("Pet not found", 404);
    return pet;
}
async function addRecord(petId, payload) {
    requirePetId(petId);
    const db = await readDB();
    const idx = (db.pets || []).findIndex((p)=>p.petId === petId);
    if (idx === -1) throw new HTTPError("Pet not found", 404);
    const record = {
        id: makeId(),
        date: sanitizeString(payload.date) || new Date().toISOString().split("T")[0],
        type: sanitizeString(payload.type) || "note",
        practitioner: sanitizeString(payload.practitioner),
        notes: sanitizeString(payload.notes)
    };
    db.pets[idx].healthRecords = db.pets[idx].healthRecords || [];
    db.pets[idx].healthRecords.unshift(record);
    await writeDB(db);
    return record;
}
async function addAppointment(petId, payload) {
    requirePetId(petId);
    const db = await readDB();
    const idx = (db.pets || []).findIndex((p)=>p.petId === petId);
    if (idx === -1) throw new HTTPError("Pet not found", 404);
    const appointment = {
        id: makeId(),
        date: sanitizeString(payload.date),
        time: sanitizeString(payload.time),
        type: sanitizeString(payload.type) || "consultation",
        practitioner: sanitizeString(payload.practitioner),
        notes: sanitizeString(payload.notes)
    };
    db.pets[idx].appointments = db.pets[idx].appointments || [];
    db.pets[idx].appointments.unshift(appointment);
    await writeDB(db);
    return appointment;
}
async function addVaccination(petId, payload) {
    requirePetId(petId);
    const db = await readDB();
    const idx = (db.pets || []).findIndex((p)=>p.petId === petId);
    if (idx === -1) throw new HTTPError("Pet not found", 404);
    const vaccination = {
        id: makeId(),
        name: sanitizeString(payload.name),
        date: sanitizeString(payload.date),
        nextDueDate: sanitizeString(payload.nextDueDate) || undefined,
        status: payload?.status || "up-to-date"
    };
    db.pets[idx].vaccinations = db.pets[idx].vaccinations || [];
    db.pets[idx].vaccinations.unshift(vaccination);
    await writeDB(db);
    return vaccination;
}
async function deleteRecord(petId, recordId) {
    requirePetId(petId);
    if (!recordId) throw new HTTPError("Missing recordId", 400);
    const db = await readDB();
    const idx = (db.pets || []).findIndex((p)=>p.petId === petId);
    if (idx === -1) throw new HTTPError("Pet not found", 404);
    db.pets[idx].healthRecords = db.pets[idx].healthRecords || [];
    const recIdx = db.pets[idx].healthRecords.findIndex((r)=>r.id === recordId);
    if (recIdx === -1) throw new HTTPError("Record not found", 404);
    const [deleted] = db.pets[idx].healthRecords.splice(recIdx, 1);
    await writeDB(db);
    return deleted;
}
async function deleteAppointment(petId, appointmentId) {
    requirePetId(petId);
    if (!appointmentId) throw new HTTPError("Missing appointmentId", 400);
    const db = await readDB();
    const idx = (db.pets || []).findIndex((p)=>p.petId === petId);
    if (idx === -1) throw new HTTPError("Pet not found", 404);
    db.pets[idx].appointments = db.pets[idx].appointments || [];
    const aIdx = db.pets[idx].appointments.findIndex((a)=>a.id === appointmentId);
    if (aIdx === -1) throw new HTTPError("Appointment not found", 404);
    const [deleted] = db.pets[idx].appointments.splice(aIdx, 1);
    await writeDB(db);
    return deleted;
}
async function deleteVaccination(petId, vaccinationId) {
    requirePetId(petId);
    if (!vaccinationId) throw new HTTPError("Missing vaccinationId", 400);
    const db = await readDB();
    const idx = (db.pets || []).findIndex((p)=>p.petId === petId);
    if (idx === -1) throw new HTTPError("Pet not found", 404);
    db.pets[idx].vaccinations = db.pets[idx].vaccinations || [];
    const vIdx = db.pets[idx].vaccinations.findIndex((v)=>v.id === vaccinationId);
    if (vIdx === -1) throw new HTTPError("Vaccination not found", 404);
    const [deleted] = db.pets[idx].vaccinations.splice(vIdx, 1);
    await writeDB(db);
    return deleted;
}
async function updateVital(petId, payload) {
    requirePetId(petId);
    const db = await readDB();
    const idx = (db.pets || []).findIndex((p)=>p.petId === petId);
    if (idx === -1) throw new HTTPError("Pet not found", 404);
    const existing = db.pets[idx].vitalStats || {};
    const updated = Object.assign({}, existing, payload || {});
    db.pets[idx].vitalStats = updated;
    await writeDB(db);
    return updated;
}
;
}),
"[project]/app/api/health/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$healthService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/healthService.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const action = searchParams.get("action");
        if (action === "urgent-reminders") {
            return await getUrgentReminders();
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: "ok"
        });
    } catch (error) {
        console.error("Erreur API health:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Erreur serveur"
        }, {
            status: 500
        });
    }
}
async function getUrgentReminders() {
    try {
        const pets = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$healthService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listPets"])();
        const reminders = [];
        // Parcourir tous les animaux
        for (const pet of pets){
            try {
                const petHealth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$healthService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPetById"])(pet.petId);
                // Vérifier les vaccinations
                if (petHealth.vaccinations) {
                    for (const vaccination of petHealth.vaccinations){
                        // Inclure tous les vaccins qui ont une date d'échéance ou qui ne sont pas à jour
                        if (vaccination.nextDueDate || vaccination.status !== "up-to-date") {
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
                                let urgencyLevel = "info";
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
                                    urgencyLevel
                                });
                            }
                        }
                    }
                }
                // Vérifier les rendez-vous médicaux
                if (petHealth.appointments) {
                    for (const appointment of petHealth.appointments){
                        const appointmentDate = new Date(`${appointment.date} ${appointment.time || "00:00"}`);
                        const now = new Date();
                        const diffTime = appointmentDate.getTime() - now.getTime();
                        const daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        // Seulement les rendez-vous dans les 7 prochains jours
                        if (daysUntil >= 0 && daysUntil <= 7) {
                            let urgencyLevel = "info";
                            if (daysUntil <= 1) urgencyLevel = "critical";
                            else if (daysUntil <= 3) urgencyLevel = "warning";
                            reminders.push({
                                id: `appt-${appointment.id}`,
                                type: "appointment",
                                title: appointment.type || "Rendez-vous",
                                petName: petHealth.name || "Animal",
                                date: appointment.date,
                                daysUntil,
                                urgencyLevel
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
        const sortedReminders = reminders.sort((a, b)=>{
            // D'abord par niveau d'urgence
            const urgencyOrder = {
                critical: 0,
                warning: 1,
                info: 2
            };
            const urgencyDiff = urgencyOrder[a.urgencyLevel] - urgencyOrder[b.urgencyLevel];
            if (urgencyDiff !== 0) return urgencyDiff;
            // Puis par nombre de jours
            return a.daysUntil - b.daysUntil;
        });
        // Ne pas limiter ici, laisser la Sidebar gérer l'affichage
        // Mais garder un maximum raisonnable pour éviter la surcharge
        const topReminders = sortedReminders.slice(0, 20);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            reminders: topReminders
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des rappels urgents:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Erreur lors de la récupération des rappels"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d75d275e._.js.map