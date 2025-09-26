import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_key";

export async function GET() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    await connectDB();
    const user = await User.findById(decoded._id);

    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      userType: user.userType,
    });
  } catch (error) {
    return NextResponse.json({ message: "Token inválido o expirado" }, { status: 401 });
  }
}