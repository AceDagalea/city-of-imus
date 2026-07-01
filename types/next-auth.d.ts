import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: string;
    canApprove: boolean;
    officeIds: string[];
    /** True once the user's email address has been verified. */
    verified: boolean;
    firstName: string;
    lastName: string;
  }

  interface Session {
    user: {
      id: string;
      role: string;
      canApprove: boolean;
      officeIds: string[];
      verified: boolean;
      firstName: string;
      lastName: string;
    } & DefaultSession["user"];
  }
}

// NextAuth v5 sources the JWT type from @auth/core/jwt; augment both paths so
// the claims are typed everywhere.
declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    canApprove: boolean;
    officeIds: string[];
    verified: boolean;
    firstName: string;
    lastName: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role: string;
    canApprove: boolean;
    officeIds: string[];
    verified: boolean;
    firstName: string;
    lastName: string;
  }
}
