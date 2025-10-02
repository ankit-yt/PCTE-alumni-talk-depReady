import mongoose from "mongoose";
import { userDocument } from "../types/model.interface";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema<userDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true , lowercase:true },
    password: { type: String, required: true },
    phone: { type: Number, required: false },
    avatar: { type: String },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

adminSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const userModel = mongoose.model<userDocument>("user", adminSchema);
