import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_key";

export async function POST(request: Request) {
  const { email, password, fullname, userType } = await request.json();
  console.log(email, password, fullname, userType);

  if (!password || password.length < 6)
    return NextResponse.json(
      { message: "El password debe tener al menos 6 caracteres" },
      { status: 400 }
    );
  try {
    await connectDB();
    const userFound = await User.findOne({ email });
    if (userFound)
      return NextResponse.json(
        { message: "El email ya esta en uso" },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email,
      password: hashedPassword,
      fullname,
      userType,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      {
        _Id: savedUser._id,
        email: savedUser.email,
        fullname: savedUser.fullname,
        userType: savedUser.userType,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const cookiesStore = await cookies();
    cookiesStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    console.log(savedUser);
    return NextResponse.json({
      _id: savedUser._id,
      email: savedUser.email,
      fullname: savedUser.fullname,
      userType: savedUser.userType,
      token,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al crear el usuario" },
      { status: 500 }
    );
  }
}
