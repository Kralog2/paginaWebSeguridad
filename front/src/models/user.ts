import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  fullname: string;
  userType: string;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Ingrese un email valido",
    ],
  },
  password: {
    type: String,
    required: [true, "El password es obligatorio"],
    select: false,
    minlength: [6, "El password debe tener al menos 6 caracteres"],
  },
  fullname: {
    type: String,
    required: [true, "El nombre completo es obligatorio"],
    minlength: [3, "El nombre completo debe tener al menos 3 caracteres"],
    maxlength: [50, "El nombre completo debe tener como maximo 50 caracteres"],
  },
  userType: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
