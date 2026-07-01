import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Route protection for the role-scoped consoles. Unauthenticated users are
// redirected to /login (pages.signIn); wrong-role users are redirected to
// their own console by the `authorized` callback in auth.config.ts.
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/admin/:path*", "/staff/:path*", "/citizen/:path*"],
};
