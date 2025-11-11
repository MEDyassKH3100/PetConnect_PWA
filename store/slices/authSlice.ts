import { apiClient } from "@/lib/api-client";
import { User } from "@/types/user";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

// Thunk pour la connexion
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post("/api/auth/login", credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Erreur de connexion"
      );
    }
  }
);

// Thunk pour l'inscription
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    userData: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post("/api/auth/register", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Erreur d'inscription"
      );
    }
  }
);

// Thunk pour récupérer le profil
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/api/profile");
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Erreur de récupération du profil"
      );
    }
  }
);

// Thunk pour mettre à jour le profil
export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await apiClient.put("/api/profile", userData);
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Erreur de mise à jour du profil"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;

      // Nettoyer le localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      }
    },
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string; refreshToken: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Initialiser depuis localStorage au démarrage
    initializeAuth: (state) => {
      if (typeof window !== "undefined") {
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
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;

        // Sauvegarder dans localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("refreshToken", action.payload.refreshToken);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // Après inscription, on peut soit connecter automatiquement, soit demander login
        // Ici on suppose que l'API retourne aussi un token après inscription
        if (action.payload.token) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.refreshToken = action.payload.refreshToken;
          state.isAuthenticated = true;

          if (typeof window !== "undefined") {
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
          }
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Profile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update Profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setCredentials, clearError, initializeAuth } =
  authSlice.actions;
export default authSlice.reducer;
