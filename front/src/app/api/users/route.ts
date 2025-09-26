import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_key";

export async function DELETE(request: Request) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.userType !== "admin") {
      return NextResponse.json(
        { message: "Solo administradores" },
        { status: 403 }
      );
    }
    const { id } = await request.json();

    await connectDB();
    const user = await User.findByIdAndDelete(id);

    return NextResponse.json({ message: "Usuario eliminado" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error de autenticación" },
      { status: 401 }
    );
  }
}

export async function GET() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.userType !== "admin") {
      return NextResponse.json(
        { message: "Solo administradores" },
        { status: 403 }
      );
    }

    await connectDB();
    const users = await User.find({}, "-password");

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "Error de autenticación" },
      { status: 401 }
    );
  }
}
