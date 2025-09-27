import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import { isValidEmail, isValidPassword } from "@/validators/authValidator";
import { loginUser } from "@/services/authService";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email) || !isValidPassword(password)) {
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 400 }
      );
    }

    const { user, token } = await loginUser({ email, password });

    const cookiesStore = await cookies();
    cookiesStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    console.log("User authenticated:", user.email);

    return NextResponse.json({
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      userType: user.userType,
      token,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Login error." }, { status: 500 });
  }
}
