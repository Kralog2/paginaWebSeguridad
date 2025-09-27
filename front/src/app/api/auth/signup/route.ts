import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import {
  isValidEmail,
  isValidFullname,
  isValidPassword,
} from "@/validators/authValidator";
import { signupUser } from "@/services/authService";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email, password, fullname, userType } = await request.json();

    if (!email || !password || !fullname) {
      return NextResponse.json(
        { message: "Email, password and fullname are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }
    if (!isValidPassword(password)) {
      return NextResponse.json(
        { message: "Password too weak" },
        { status: 400 }
      );
    }
    if (!isValidFullname(fullname)) {
      return NextResponse.json(
        { message: "Invalid fullname" },
        { status: 400 }
      );
    }

    console.log(`New user signup attempt: ${email}, ${fullname}`);
    const { user, token } = await signupUser({
      email,
      password,
      fullname,
      userType,
    });

    const cookiesStore = await cookies();
    cookiesStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      userType: user.userType,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: error.message || "Error on signup." },
      { status: 400 }
    );
  }
}
