"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/auth-client";
import type { SessionUser } from "@/lib/types";

/** C3 — Update Information: form with a Name field + Update Information button.
 *  Uses BetterAuth's updateUser (better-auth.com/docs/concepts/users-accounts#update-user) */
export default function UpdateView({ user }: { user: SessionUser }) {
  const router = useRouter();
  const [name, setName] = useState(user.name ?? "");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম লিখুন");
      return;
    }
    setSaving(true);
    try {
      const { error } = await updateUser({ name: name.trim() });
      if (error) {
        toast.error(error.message || "তথ্য আপডেট ব্যর্থ হয়েছে");
        return;
      }
      toast.success("আপনার তথ্য আপডেট হয়েছে");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("তথ্য আপডেট ব্যর্থ হয়েছে");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <p className="mt-1 text-sm text-base-content/50">
        আপনার নাম পরিবর্তন করে "তথ্য আপডেট" চাপুন।
      </p>

      <div className="card mt-6 border border-base-300/70 bg-base-100 shadow-sm">
        <div className="card-body gap-4">
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
            <button type="submit" disabled={saving} className="btn btn-primary w-full">
              {saving ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "তথ্য আপডেট"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
