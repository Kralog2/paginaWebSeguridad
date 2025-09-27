import { NextResponse } from "next/server";
import jwt, {JwtPayload} from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not configured");
}
const JWT_SECRET = process.env.JWT_SECRET;

export async function GET() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Not authorized." }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    await connectDB();
    const user = await User.findById(decoded._id);

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json({
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      userType: user.userType,
    });
  } catch (error) {
    return NextResponse.json({ message: "Invalid or expired Token." }, { status: 401 });
  }
}