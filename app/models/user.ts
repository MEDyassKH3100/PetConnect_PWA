import mongoose, { Schema, model, models } from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  phone?: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
});

export default models.User || model<IUser>("User", UserSchema);
