"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <nav className="navbar bg-base-300 px-6">
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold">
          MyApp
        </Link>
      </div>

      <div className="flex gap-4">
        {session ? (
          <>
            <span className="text-sm">Welcome {session.user?.email}</span>
            <button className="btn btn-sm" onClick={() => signOut()}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="btn btn-sm btn-outline">
              Login
            </Link>
            <Link href="/register" className="btn btn-sm btn-primary">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
