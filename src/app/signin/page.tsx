"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import SocialButtons from "@/components/social-buttons";
import { signIn, useSession } from "@/lib/auth-client";

const ERROR_MESSAGES: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "ভুল ইমেইল বা পাসওয়ার্ড। আবার চেষ্টা করুন।",
  USER_NOT_FOUND: "এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট নেই। আগে সাইন আপ করুন।",
  USER_ALREADY_EXISTS: "এই ইমেইল দিয়ে অ্যাকাউন্ট আগেই আছে।",
};

function SignInInner() {
  const params = useSearchParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = params.get("redirect") || "/";

  // toast for protected-route redirects
  useEffect(() => {
    if (params.get("reason") === "protected") {
      toast.error("এই পেজটি দেখতে অনুগ্রহ করে লগইন করুন");
    }
  }, [params]);

  // already logged in → straight home
  useEffect(() => {
    if (!isPending && session) router.replace(redirectTo);
  }, [isPending, session, router, redirectTo]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await signIn.email({ email: email.trim(), password });
      if (error) {
        toast.error(ERROR_MESSAGES[error.code ?? ""] ?? "লগইন ব্যর্থ হয়েছে");
        return;
      }
      toast.success("সফলভাবে লগইন হয়েছে");
      router.push(redirectTo);
      router.refresh();
    } catch {
      toast.error("লগইন ব্যর্থ হয়েছে — ইন্টারনেট চেক করুন");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="card w-full max-w-md border border-base-300/70 bg-base-100 shadow-sm">
      <div className="card-body gap-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">স্বাগতম</h1>
          <p className="mt-1 text-sm text-base-content/60">
            অনুগ্রহ করে আপনার অ্যাকাউন্টে লগইন করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="form-control">
            <label htmlFor="email" className="label pb-1 text-sm">
              ইমেইল
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="form-control">
            <label htmlFor="password" className="label pb-1 text-sm">
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary w-full"
          >
            {submitting ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "লগইন"
            )}
          </button>
        </form>

        <div className="flex items-center gap-3 text-xs text-base-content/40">
          <span className="h-px flex-1 bg-base-300" /> অথবা{" "}
          <span className="h-px flex-1 bg-base-300" />
        </div>

        <SocialButtons callbackURL={redirectTo} />

        <p className="text-center text-sm text-base-content/60">
          নতুন অ্যাকাউন্ট?{" "}
          <Link href="/signup" className="link-hover font-medium text-primary">
            অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <Suspense fallback={<div className="skeleton h-96 w-full max-w-md rounded-2xl" />}>
        <SignInInner />
      </Suspense>
    </div>
  );
}
