import mongoose, { Schema, Document } from "mongoose";

export interface IWeightLog extends Document {
  petId: mongoose.Types.ObjectId;
  weight: number;
  date: Date;
}

const WeightLogSchema = new Schema<IWeightLog>({
  petId: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
  weight: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.WeightLog ||
  mongoose.model<IWeightLog>("WeightLog", WeightLogSchema);
