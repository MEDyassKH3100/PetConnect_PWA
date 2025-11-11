import { apiClient } from "@/lib/api-client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Pet } from "@/types/pet";

interface PetsState {
  pets: Pet[];
  selectedPet: Pet | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PetsState = {
  pets: [],
  selectedPet: null,
  isLoading: false,
  error: null,
};

// Thunks
export const fetchPets = createAsyncThunk(
  "pets/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/api/pets");
      return response.data.pets;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Erreur de récupération des animaux"
      );
    }
  }
);

export const addPet = createAsyncThunk(
  "pets/add",
  async (petData: Omit<Pet, "_id" | "owner">, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/api/pets", petData);
      return response.data.pet;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Erreur d'ajout de l'animal"
      );
    }
  }
);

export const updatePet = createAsyncThunk(
  "pets/update",
  async (petData: Partial<Pet> & { id: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch("/api/pets", petData);
      return response.data.pet;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Erreur de mise à jour de l'animal"
      );
    }
  }
);

export const deletePet = createAsyncThunk(
  "pets/delete",
  async (petId: string, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/api/pets?id=${petId}`);
      return petId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Erreur de suppression de l'animal"
      );
    }
  }
);

const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    selectPet: (state, action) => {
      state.selectedPet = action.payload;
    },
    clearSelectedPet: (state) => {
      state.selectedPet = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Pets
    builder
      .addCase(fetchPets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pets = action.payload;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Add Pet
    builder
      .addCase(addPet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pets.push(action.payload);
      })
      .addCase(addPet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update Pet
    builder.addCase(updatePet.fulfilled, (state, action) => {
      const index = state.pets.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        state.pets[index] = action.payload;
      }
      if (state.selectedPet?._id === action.payload._id) {
        state.selectedPet = action.payload;
      }
    });

    // Delete Pet
    builder.addCase(deletePet.fulfilled, (state, action) => {
      state.pets = state.pets.filter((p) => p._id !== action.payload);
      if (state.selectedPet?._id === action.payload) {
        state.selectedPet = null;
      }
    });
  },
});

export const { selectPet, clearSelectedPet, clearError } = petsSlice.actions;
export default petsSlice.reducer;
