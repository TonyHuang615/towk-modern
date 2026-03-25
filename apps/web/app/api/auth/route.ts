import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_USER = {
  username: "admin",
  password: "admin123",
};

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
      const cookieStore = cookies();
      cookieStore.set("auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = cookies();
    cookieStore.delete("auth");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
