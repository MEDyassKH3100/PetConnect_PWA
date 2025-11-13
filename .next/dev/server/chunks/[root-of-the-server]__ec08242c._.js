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
"[externals]/mongoose [external] (mongoose, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}),
"[project]/models/Pet.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const PetSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    owner: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"].Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    weight: {
        type: String
    },
    image: {
        type: String
    },
    microchip: {
        type: String
    },
    birthdate: {
        type: String
    },
    status: {
        type: String,
        default: "Actif"
    }
}, {
    timestamps: true
});
const Pet = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Pet || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("Pet", PetSchema);
const __TURBOPACK__default__export__ = Pet;
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
"[project]/app/api/health/[petId]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$healthService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/healthService.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Pet$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Pet.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
;
;
;
;
// Fonction pour créer une entrée Health à partir des données MongoDB
async function createHealthEntryFromMongo(petId) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const mongoPet = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Pet$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findById(petId);
        if (!mongoPet) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$healthService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HTTPError"]("Pet not found in MongoDB", 404);
        }
        // Créer l'entrée Health avec les vraies informations de l'animal
        const healthPet = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$healthService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPet"])(mongoPet.name || `Animal-${petId.slice(0, 8)}`, mongoPet.type || mongoPet.breed || "Unknown", petId // Utiliser l'ID MongoDB comme petId
        );
        return healthPet;
    } catch (error) {
        console.error("Error creating health entry from MongoDB:", error);
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$healthService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HTTPError"]("Failed to create health entry", 500);
    }
}
async function GET(request, { params }) {
    try {
        // `params` may be a promise in Next.js route handlers; await it before accessing properties
        const petId = (await params)?.petId;
        if (!petId) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Missing petId"
        }, {
            status: 400
        });
        try {
            const pet = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$healthService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPetById"])(petId);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(pet);
        } catch (err) {
            // Si l'animal n'existe pas dans la base Health, le créer automatiquement depuis MongoDB
            if (err.message === "Pet not found") {
                console.log(`Creating health entry for pet: ${petId}`);
                const newPet = await createHealthEntryFromMongo(petId);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newPet);
            }
            throw err;
        }
    } catch (err) {
        console.error("GET /api/health/[petId] error", err);
        if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$healthService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HTTPError"]) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err.message
        }, {
            status: err.status
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch pet"
        }, {
            status: 500
        });
    }
}
// Fonction helper pour s'assurer que l'animal existe dans la base Health
async function ensurePetExists(petId) {
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$healthService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPetById"])(petId);
    } catch (err) {
        if (err.message === "Pet not found") {
            console.log(`Auto-creating health entry for pet: ${petId}`);
            return await createHealthEntryFromMongo(petId);
        }
        throw err;
    }
}
async function POST(request, { params }) {
    try {
        const petId = (await params)?.petId;
        if (!petId) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Missing petId"
        }, {
            status: 400
        });
        // S'assurer que l'animal existe dans la base Health avant toute opération
        await ensurePetExists(petId);
        const body = await request.json();
        const { action, payload } = body || {};
        if (!action || payload === undefined) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Missing action or payload"
        }, {
            status: 400
        });
        if (action === "addRecord") {
            const rec = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$healthService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addRecord"])(petId, payload);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(rec, {
                status: 201
            });
        }
        if (action === "addAppointment") {
            const appt = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$healthService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addAppointment"])(petId, payload);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(appt, {
                status: 201
            });
        }
        if (action === "addVaccination") {
            const vac = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$healthService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addVaccination"])(petId, payload);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(vac, {
                status: 201
            });
        }
        if (action === "deleteRecord") {
            const deleted = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$healthService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteRecord"])(petId, payload?.id || payload?.recordId);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(deleted, {
                status: 200
            });
        }
        if (action === "deleteAppointment") {
            const deleted = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$healthService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteAppointment"])(petId, payload?.id || payload?.appointmentId);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(deleted, {
                status: 200
            });
        }
        if (action === "deleteVaccination") {
            const deleted = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$healthService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteVaccination"])(petId, payload?.id || payload?.vaccinationId);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(deleted, {
                status: 200
            });
        }
        if (action === "updateVital") {
            const vit = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$healthService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateVital"])(petId, payload);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(vit, {
                status: 200
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Unknown action"
        }, {
            status: 400
        });
    } catch (err) {
        console.error("POST /api/health/[petId] error", err);
        if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$healthService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HTTPError"]) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err.message
        }, {
            status: err.status
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to update pet"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ec08242c._.js.map