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
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Invalid email.",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    select: false,
    minlength: [12, "Password must be at least 8 characters long."],
  },
  fullname: {
    type: String,
    required: [true, "Full name is required"],
    minlength: [3, "Full name must be at least 3 characters long."],
    maxlength: [50, "Full name must be at most 50 characters long."],
    match: [/^[A-Za-zÀ-ÖØ-öø-ÿ' -]{3,50}$/u, "Full name can only contain letters and spaces."],
  },
  userType: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
