"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { bnDate } from "@/lib/bengali";
import { signOut, useSession } from "@/lib/auth-client";
import type { Category } from "@/lib/types";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="বাজার দর — হোম">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-xl text-primary-content shadow-sm">
        <span role="img" aria-hidden>🧺</span>
      </span>
      <span className="leading-tight">
        <span className="block text-lg font-bold">বাজার দর</span>
        <span className="block text-[11px] text-base-content/50" suppressHydrationWarning>
          {bnDate()}
        </span>
      </span>
    </Link>
  );
}

function AuthArea() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return <div className="skeleton h-10 w-24 rounded-lg" />;
  }

  const user = session?.user;

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
          সাইন ইন
        </Link>
        <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
          সাইন আপ
        </Link>
      </div>
    );
  }

  async function handleSignOut() {
    await signOut();
    toast.success("সফলভাবে লগআউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="flex cursor-pointer items-center gap-2 rounded-full py-1 pl-1 pr-3 hover:bg-base-200"
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="h-9 w-9 rounded-full border border-base-300 object-cover"
          />
        ) : (
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 font-semibold text-primary">
            {user.name?.slice(0, 1) || "খ"}
          </span>
        )}
        <span className="hidden text-sm font-medium sm:inline">{user.name}</span>
        <span className="text-xs text-base-content/40">▾</span>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-menu z-50 w-60 rounded-xl border border-base-300/70 bg-base-100 p-2 shadow-lg"
      >
        <li className="pointer-events-none">
          <div className="py-1">
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-base-content/50">{user.email}</p>
          </div>
        </li>
        <li>
          <Link href="/profile" className="text-primary">
            <span aria-hidden>👤</span> আমার প্রোফাইল
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={handleSignOut}
            className="text-error"
          >
            <span aria-hidden>↩</span> সাইন আউট
          </button>
        </li>
      </ul>
    </div>
  );
}

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  return (
    <nav className="border-b border-base-300/70 bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Logo />
        <AuthArea />
      </div>

      {/* second row — category links */}
      <div className="border-t border-base-300/60">
        <div className="mx-auto max-w-6xl px-4">
          <ul className="no-scrollbar flex items-center gap-1 overflow-x-auto py-1.5 text-sm">
            {categories.map((c) => {
              const active = pathname === `/category/${c.slug}`;
              return (
                <li key={c.slug} className="shrink-0">
                  <Link
                    href={`/category/${c.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-colors ${
                      active
                        ? "bg-primary font-semibold text-primary-content"
                        : "text-base-content/70 hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    <span aria-hidden>{c.icon}</span> {c.nameBn}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
