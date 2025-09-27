import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/user";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not configured");
}
const JWT_SECRET = process.env.JWT_SECRET;

export async function signupUser({
  email,
  password,
  fullname,
  userType,
}: {
  email: string;
  password: string;
  fullname: string;
  userType: "user" | "admin";
}) {
  const userFound = await User.findOne({ email });
  if (userFound) {
    throw new Error("Email is used.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    email,
    password: hashedPassword,
    fullname,
    userType: userType || "user",
  });

  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      userType: user.userType,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid credentials.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials.");
  }

  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      userType: user.userType,
    },
    JWT_SECRET,
    { expiresIn: "30d" }
  );

  return { user, token };
}
