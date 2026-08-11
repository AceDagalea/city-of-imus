"use client";

import { useTransition } from "react";
import { logoutAction } from "@/app/actions/auth";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

/**
 * Clears the Auth.js session, then does a full document navigation to `/`.
 * Soft redirects after signOut can hit a broken webpack chunk load
 * (`options.factory` / `reading 'call'`) in Next.js 14 client navigation.
 */
export default function SignOutButton({ className, children = "Sign Out" }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className={className}
      disabled={pending}
      aria-busy={pending}
      onClick={() => {
        startTransition(async () => {
          try {
            await logoutAction();
          } finally {
            // Full reload avoids soft RSC remount / webpack chunk errors after auth change.
            window.location.assign("/");
          }
        });
      }}
    >
      {children}
    </button>
  );
}
