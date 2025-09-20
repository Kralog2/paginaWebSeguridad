import { NextResponse } from "next/server";
import User from "@/models/user";
import { conectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { seedAdmin } from "@/libs/seedAdmin";

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_key";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email y contraseña son requeridos" },
      { status: 400 }
    );
  }

  try {
    await conectDB();

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { message: "Usuario o contraseña incorrectos" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Usuario o contraseña incorrectos" },
        { status: 400 }
      );
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

    const cookiesStore = await cookies();
    cookiesStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    console.log("Usuario autenticado:", user.email);

    return NextResponse.json({
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      userType: user.userType,
      token,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al iniciar sesión" },
      { status: 500 }
    );
  }
  
}
