(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/ServiceWorkerRegistration.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ServiceWorkerRegistration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function ServiceWorkerRegistration() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ServiceWorkerRegistration.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") !== 'undefined' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.register('/service-worker.js').then({
                    "ServiceWorkerRegistration.useEffect": (registration)=>{
                        console.log('Service Worker registered successfully:', registration);
                    }
                }["ServiceWorkerRegistration.useEffect"]).catch({
                    "ServiceWorkerRegistration.useEffect": (error)=>{
                        console.error('Service Worker registration failed:', error);
                    }
                }["ServiceWorkerRegistration.useEffect"]);
            }
        }
    }["ServiceWorkerRegistration.useEffect"], []);
    return null; // Ce composant n'affiche rien, il ne fait qu'enregistrer le SW
}
_s(ServiceWorkerRegistration, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = ServiceWorkerRegistration;
var _c;
__turbopack_context__.k.register(_c, "ServiceWorkerRegistration");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiClient",
    ()=>apiClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
// Créer une instance Axios configurée
const apiClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: ("TURBOPACK compile-time value", "http://localhost:3000") || "http://localhost:3000",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});
// Intercepteur pour ajouter le token à chaque requête
apiClient.interceptors.request.use((config)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error)=>{
    return Promise.reject(error);
});
// Intercepteur pour gérer les erreurs de réponse
apiClient.interceptors.response.use((response)=>response, async (error)=>{
    const originalRequest = error.config;
    // Si erreur 401 et pas déjà tenté de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/api/auth/refresh", {
                    refreshToken
                });
                const { token } = response.data;
                localStorage.setItem("token", token);
                // Réessayer la requête originale avec le nouveau token
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return apiClient(originalRequest);
            }
        } catch (refreshError) {
            // Si le refresh échoue, déconnecter l'utilisateur
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            window.location.href = "/";
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
});
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/store/slices/authSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearError",
    ()=>clearError,
    "default",
    ()=>__TURBOPACK__default__export__,
    "fetchUserProfile",
    ()=>fetchUserProfile,
    "initializeAuth",
    ()=>initializeAuth,
    "loginUser",
    ()=>loginUser,
    "logout",
    ()=>logout,
    "registerUser",
    ()=>registerUser,
    "setCredentials",
    ()=>setCredentials,
    "updateUserProfile",
    ()=>updateUserProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
;
const initialState = {
    user: null,
    token: null,
    refreshToken: null,
    isLoading: false,
    isAuthenticated: false,
    error: null
};
const loginUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/login", async (credentials, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/api/auth/login", credentials);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Erreur de connexion");
    }
});
const registerUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/register", async (userData, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/api/auth/register", userData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Erreur d'inscription");
    }
});
const fetchUserProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/fetchProfile", async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/api/profile");
        return response.data.user;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Erreur de récupération du profil");
    }
});
const updateUserProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/updateProfile", async (userData, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].put("/api/profile", userData);
        return response.data.user;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Erreur de mise à jour du profil");
    }
});
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "auth",
    initialState,
    reducers: {
        logout: (state)=>{
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.error = null;
            // Nettoyer le localStorage
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");
            }
        },
        setCredentials: (state, action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
            state.error = null;
        },
        clearError: (state)=>{
            state.error = null;
        },
        // Initialiser depuis localStorage au démarrage
        initializeAuth: (state)=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const token = localStorage.getItem("token");
                const refreshToken = localStorage.getItem("refreshToken");
                const userStr = localStorage.getItem("user");
                if (token && userStr) {
                    try {
                        const user = JSON.parse(userStr);
                        state.user = user;
                        state.token = token;
                        state.refreshToken = refreshToken;
                        state.isAuthenticated = true;
                    } catch (error) {
                        // Si erreur de parsing, nettoyer
                        localStorage.removeItem("token");
                        localStorage.removeItem("refreshToken");
                        localStorage.removeItem("user");
                    }
                }
            }
        }
    },
    extraReducers: (builder)=>{
        // Login
        builder.addCase(loginUser.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        }).addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
            // Sauvegarder dans localStorage
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("refreshToken", action.payload.refreshToken);
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            }
        }).addCase(loginUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        });
        // Register
        builder.addCase(registerUser.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        }).addCase(registerUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            // Après inscription, on peut soit connecter automatiquement, soit demander login
            // Ici on suppose que l'API retourne aussi un token après inscription
            if (action.payload.token) {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                state.isAuthenticated = true;
                if ("TURBOPACK compile-time truthy", 1) {
                    localStorage.setItem("token", action.payload.token);
                    localStorage.setItem("refreshToken", action.payload.refreshToken);
                    localStorage.setItem("user", JSON.stringify(action.payload.user));
                }
            }
        }).addCase(registerUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        });
        // Fetch Profile
        builder.addCase(fetchUserProfile.pending, (state)=>{
            state.isLoading = true;
        }).addCase(fetchUserProfile.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user = action.payload;
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("user", JSON.stringify(action.payload));
            }
        }).addCase(fetchUserProfile.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        });
        // Update Profile
        builder.addCase(updateUserProfile.pending, (state)=>{
            state.isLoading = true;
        }).addCase(updateUserProfile.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user = action.payload;
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("user", JSON.stringify(action.payload));
            }
        }).addCase(updateUserProfile.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});
const { logout, setCredentials, clearError, initializeAuth } = authSlice.actions;
const __TURBOPACK__default__export__ = authSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/store/slices/petsSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addPet",
    ()=>addPet,
    "clearError",
    ()=>clearError,
    "clearSelectedPet",
    ()=>clearSelectedPet,
    "default",
    ()=>__TURBOPACK__default__export__,
    "deletePet",
    ()=>deletePet,
    "fetchPets",
    ()=>fetchPets,
    "selectPet",
    ()=>selectPet,
    "updatePet",
    ()=>updatePet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
;
const initialState = {
    pets: [],
    selectedPet: null,
    isLoading: false,
    error: null
};
const fetchPets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("pets/fetchAll", async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/api/pets");
        return response.data.pets;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Erreur de récupération des animaux");
    }
});
const addPet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("pets/add", async (petData, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/api/pets", petData);
        return response.data.pet;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Erreur d'ajout de l'animal");
    }
});
const updatePet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("pets/update", async (petData, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch("/api/pets", petData);
        return response.data.pet;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Erreur de mise à jour de l'animal");
    }
});
const deletePet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("pets/delete", async (petId, { rejectWithValue })=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/api/pets?id=${petId}`);
        return petId;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Erreur de suppression de l'animal");
    }
});
const petsSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "pets",
    initialState,
    reducers: {
        selectPet: (state, action)=>{
            state.selectedPet = action.payload;
        },
        clearSelectedPet: (state)=>{
            state.selectedPet = null;
        },
        clearError: (state)=>{
            state.error = null;
        }
    },
    extraReducers: (builder)=>{
        // Fetch Pets
        builder.addCase(fetchPets.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        }).addCase(fetchPets.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.pets = action.payload;
        }).addCase(fetchPets.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        });
        // Add Pet
        builder.addCase(addPet.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        }).addCase(addPet.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.pets.push(action.payload);
        }).addCase(addPet.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        });
        // Update Pet
        builder.addCase(updatePet.fulfilled, (state, action)=>{
            const index = state.pets.findIndex((p)=>p._id === action.payload._id);
            if (index !== -1) {
                state.pets[index] = action.payload;
            }
            if (state.selectedPet?._id === action.payload._id) {
                state.selectedPet = action.payload;
            }
        });
        // Delete Pet
        builder.addCase(deletePet.fulfilled, (state, action)=>{
            state.pets = state.pets.filter((p)=>p._id !== action.payload);
            if (state.selectedPet?._id === action.payload) {
                state.selectedPet = null;
            }
        });
    }
});
const { selectPet, clearSelectedPet, clearError } = petsSlice.actions;
const __TURBOPACK__default__export__ = petsSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/store/slices/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/slices/authSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$petsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/slices/petsSlice.ts [app-client] (ecmascript)");
;
;
;
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        pets: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$petsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
            serializableCheck: false
        }),
    devTools: ("TURBOPACK compile-time value", "development") !== "production"
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Provider/ReduxProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReduxProvider",
    ()=>ReduxProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/slices/authSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/slices/index.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ReduxProvider({ children }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReduxProvider.useEffect": ()=>{
            // Initialiser l'auth depuis localStorage au montage
            __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"].dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeAuth"])());
        }
    }["ReduxProvider.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"],
        children: children
    }, void 0, false, {
        fileName: "[project]/Provider/ReduxProvider.tsx",
        lineNumber: 14,
        columnNumber: 12
    }, this);
}
_s(ReduxProvider, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = ReduxProvider;
var _c;
__turbopack_context__.k.register(_c, "ReduxProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_b23a5dca._.js.map