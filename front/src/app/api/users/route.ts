import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not configured");
}
const JWT_SECRET = process.env.JWT_SECRET;

export async function DELETE(request: Request) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Not authorized." }, { status: 401 });
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    if (typeof decoded !== "object" || decoded.userType !== "admin") {
      return NextResponse.json(
        { message: "Only administrators" },
        { status: 403 }
      );
    }
    const { id } = await request.json();
    if (!id || typeof id !== "string" || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return NextResponse.json({ message: "Invalid user id" }, { status: 400 });
    }

    await connectDB();
    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User Deleted." });
  } catch (error) {
    return NextResponse.json(
      { message: "Error in DELETE /usrs" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    if (typeof decoded !== "object" || decoded.userType !== "admin") {
      return NextResponse.json(
        { message: "Only administrators" },
        { status: 403 }
      );
    }

    await connectDB();
    const users = await User.find({}, "-password");

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "Error in GET /users", error },
      { status: 500 }
    );
  }
}
