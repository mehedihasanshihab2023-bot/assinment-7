"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { signOut } from "@/lib/auth-client";
import type { SessionUser } from "@/lib/types";

export default function ProfileView({ user }: { user: SessionUser }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleSignOut() {
    setLoggingOut(true);
    await signOut();
    toast.success("সফলভাবে লগআউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-base-content/50">
        এখানে আপনার অ্যাকাউন্টের তথ্য দেখতে ও পরিবর্তন করতে পারবেন।
      </p>

      {/* user info card */}
      <div className="card mt-6 border border-base-300/70 bg-base-100 shadow-sm">
        <div className="card-body flex-row flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="h-14 w-14 rounded-full border border-base-300 object-cover"
              />
            ) : (
              <span className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                {user.name?.slice(0, 1) || "খ"}
              </span>
            )}
            <div>
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-base-content/50">{user.email}</p>
            </div>
          </div>
          <Link href="/profile/update" className="btn btn-outline btn-error btn-sm sm:btn-md">
            ↪ সম্পাদন করুন
          </Link>
        </div>
      </div>

      <div className="card mt-4 border border-base-300/70 bg-base-100 shadow-sm">
        <div className="card-body gap-2">
          <p className="font-semibold">অ্যাকাউন্ট</p>
          <p className="text-sm text-base-content/60">
            পণ্যের দাম দেখতে <Link href="/" className="link text-primary">হোম পেজে</Link> ফিরে যান।
          </p>
          <div className="mt-2">
            <button
              type="button"
              onClick={handleSignOut}
              disabled={loggingOut}
              className="btn btn-ghost btn-sm text-error sm:btn-md"
            >
              {loggingOut ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "সাইন আউট"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
