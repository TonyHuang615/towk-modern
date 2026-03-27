import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

async function handler(req: NextRequest) {
  const { default: NextAuth } = await import("next-auth");
  const { authOptions } = await import("../../../../lib/auth");
  // @ts-expect-error NextAuth handler types
  return NextAuth(req, authOptions);
}

export { handler as GET, handler as POST };
