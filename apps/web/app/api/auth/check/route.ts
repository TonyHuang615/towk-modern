import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";
import { usingDefaultPassword } from "@/lib/admin-account";

export async function GET() {
  try {
    if (isAuthed()) {
      return NextResponse.json({
        authenticated: true,
        usingDefaultPassword: usingDefaultPassword(),
      });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
