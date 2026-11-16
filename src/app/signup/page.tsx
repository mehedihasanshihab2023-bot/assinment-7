"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialButtons from "@/components/social-buttons";
import { signUp } from "@/lib/auth-client";

function SignUpInner() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }
    if (!email.trim()) {
      toast.error("ইমেইল দিন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      if (error) {
        toast.error(
          error.code === "USER_ALREADY_EXISTS"
            ? "এই ইমেইল দিয়ে অ্যাকাউন্ট আগেই আছে।"
            : error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে"
        );
        return;
      }
      toast.success("অ্যাকাউন্ট তৈরি সফল! এখন লগইন করুন");
      router.push("/signin");
      router.refresh();
    } catch {
      toast.error("রেজিস্ট্রেশন ব্যর্থ হয়েছে — ইন্টারনেট চেক করুন");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="card w-full max-w-md border border-base-300/70 bg-base-100 shadow-sm">
      <div className="card-body gap-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">সাইন আপ</h1>
          <p className="mt-1 text-sm text-base-content/60">
            বাজার দরে স্বাগতম — নতুন অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="form-control">
            <label htmlFor="name" className="label pb-1 text-sm">
              নাম
            </label>
            <input
              id="name"
              type="text"
              required
              placeholder="আপনার নাম"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>
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
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <button type="submit" disabled={submitting} className="btn btn-primary w-full">
            {submitting ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "অ্যাকাউন্ট তৈরি করুন"
            )}
          </button>
        </form>

        <div className="flex items-center gap-3 text-xs text-base-content/40">
          <span className="h-px flex-1 bg-base-300" /> অথবা{" "}
          <span className="h-px flex-1 bg-base-300" />
        </div>

        <SocialButtons callbackURL="/" />

        <p className="text-center text-sm text-base-content/60">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="link-hover font-medium text-primary">
            লগইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <SignUpInner />
    </div>
  );
}
