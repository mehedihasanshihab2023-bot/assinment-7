"use client";

import { useEffect } from "react";

/** Global error boundary — keeps the app friendly even if something throws. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="card w-full max-w-md border border-base-300/70 bg-base-100 shadow-sm">
        <div className="card-body items-center text-center">
          <span className="text-6xl" role="img" aria-label="error">
            🍋
          </span>
          <h1 className="mt-2 text-2xl font-bold">একটু সমস্যা হয়েছে</h1>
          <p className="text-sm text-base-content/60">
            দুঃখিত! পেজটি লোড করতে সমস্যা হচ্ছে। অনুগ্রহ করে আবার চেষ্টা করুন।
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={reset} className="btn btn-primary btn-sm sm:btn-md">
              আবার চেষ্টা করুন
            </button>
            <a href="/" className="btn btn-ghost btn-sm sm:btn-md">
              হোম পেজে ফিরে যান
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
