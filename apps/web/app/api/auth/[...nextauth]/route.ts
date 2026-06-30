import NextAuth from "next-auth";
import { authOptions } from "../../../../lib/auth";

export const dynamic = "force-dynamic";

// next-auth v4 App Router handler: NextAuth(authOptions) returns the
// (req, ctx) => Response route handler. Passing the request directly (the old
// pages-router signature) breaks with "Cannot destructure 'nextauth'".
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
