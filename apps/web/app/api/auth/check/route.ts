import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";

export async function GET() {
  try {
    if (isAuthed()) {
      return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
