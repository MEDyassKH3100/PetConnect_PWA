import mongoose, { Schema, Document } from "mongoose";

export interface IPet extends Document {
  owner: mongoose.Types.ObjectId;
  name: string;
  type: string;
  breed: string;
  age?: string;
  gender: string;
  weight: string;
  image: string;
  microchip?: string;
  birthdate?: string;
  status?: string;
}

const PetSchema = new Schema<IPet>(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    weight: { type: String },
    image: { type: String },
    microchip: { type: String },
    birthdate: { type: String },
    status: { type: String, default: "Actif" },
  },
  { timestamps: true }
);

const Pet = mongoose.models.Pet || mongoose.model<IPet>("Pet", PetSchema);
export default Pet;
