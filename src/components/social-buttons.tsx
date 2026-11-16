"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

const PROVIDERS = [
  {
    id: "google" as const,
    label: "Google দিয়ে লগইন করুন",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path
          fill="#4285F4"
          d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.1h6.5c-.1 1-.8 2.6-2.4 3.6l3.7 2.9c2.3-2.1 3.7-5.1 3.7-8.4z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.7-2.9c-1 .7-2.4 1.2-4.2 1.2-3.2 0-6-2.1-6.9-5.1L1.2 17.2C3.2 21.2 7.3 24 12 24z"
        />
        <path
          fill="#FBBC05"
          d="M5.1 14.3c-.3-.8-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.2 6.8C.4 8.4 0 10.2 0 12s.4 3.6 1.2 5.2l3.9-2.9z"
        />
        <path
          fill="#EA4335"
          d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.3 0 3.2 2.8 1.2 6.8l3.9 2.9c.9-2.9 3.7-5 6.9-5z"
        />
      </svg>
    ),
  },
  {
    id: "github" as const,
    label: "GitHub দিয়ে লগইন করুন",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path
          fill="currentColor"
          d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.7 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1 .8 2.1v3.1c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"
        />
      </svg>
    ),
  },
];

export default function SocialButtons({ callbackURL = "/" }: { callbackURL?: string }) {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleSocial(provider: "google" | "github") {
    setLoading(provider);
    try {
      const { error } = await signIn.social({
        provider,
        callbackURL,
      });
      if (error) {
        toast.error(
          error.message ||
            `${provider} লগইন কনফিগার করা নেই — ইমেইল/পাসওয়ার্ড ব্যবহার করুন।`
        );
      }
      // on success better-auth redirects to the provider automatically
    } catch {
      toast.error("সোশ্যাল লগইন ব্যর্থ হয়েছে।");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {PROVIDERS.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => handleSocial(p.id)}
          disabled={loading !== null}
          className="btn btn-outline btn-sm sm:btn-md"
        >
          {loading === p.id ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            p.icon
          )}
          {p.label}
        </button>
      ))}
    </div>
  );
}
