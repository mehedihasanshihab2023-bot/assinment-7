import Link from "next/link";

/** Shared 404-style view — used by not-found.tsx and empty categories. */
export default function NotFoundView({
  title = "পেজটি পাওয়া যায়নি",
  message = "দুঃখিত! আপনি যে পেজ বা ক্যাটাগরিটি খুঁজছেন সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।",
  emoji = "🍉",
}: {
  title?: string;
  message?: string;
  emoji?: string;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="card w-full max-w-md border border-base-300/70 bg-base-100 shadow-sm">
        <div className="card-body items-center text-center">
          <span className="text-6xl" role="img" aria-label="not found">
            {emoji}
          </span>
          <h1 className="mt-2 text-2xl font-bold">৪০৪ — {title}</h1>
          <p className="text-sm text-base-content/60">{message}</p>
          <div className="mt-4">
            <Link href="/" className="btn btn-primary btn-sm sm:btn-md">
              হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
