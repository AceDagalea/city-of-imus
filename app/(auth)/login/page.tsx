import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginFormClient from "./LoginFormClient";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string };
}) {
  const session = await auth();

  // Already signed in — skip the login form (unless showing an error).
  if (session?.user && !searchParams.error) {
    const role = session.user.role;
    const home =
      role === "ADMIN" ? "/admin" : role === "STAFF" ? "/staff/queue" : "/citizen/dashboard";
    redirect(searchParams.callbackUrl || home);
  }

  return <LoginFormClient callbackUrl={searchParams.callbackUrl ?? ""} />;
}
