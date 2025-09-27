import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(_request: Request) {
    const cookiesStore = await cookies();
    cookiesStore.set("token", "", {
        httpOnly: true,
        maxAge: 0,
        path: "/",
    });

  return NextResponse.json({ message: "Logged out successfully." });
}
