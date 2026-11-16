# 🧺 বাজার দর / BazarDor

**বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।**

BazarDor is a daily grocery price tracker for Bangladesh. It shows today's market
prices of essential commodities — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলা —
with day-over-day change badges, market-wise price tables, category browsing and
sorting, all in a fully responsive Bengali-first UI.

> সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।

---

## 🔗 Live & Repository

- **Live Link:** _deployment-এর পর এখানে আপনার Vercel লিংক বসান_
- **GitHub Repository:** _আপনার GitHub repo লিংক বসান_

---

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| [Next.js 15](https://nextjs.org) (App Router) | UI + routing (pages, dynamic `[slug]` routes, API routes) |
| [TypeScript](https://www.typescriptlang.org) | Type-safe code |
| [Tailwind CSS v4](https://tailwindcss.com) + [DaisyUI 5](https://daisyui.com) | Styling, custom theme & responsiveness |
| [BetterAuth](https://better-auth.com) | Email/password + Google + GitHub authentication (SQLite via better-sqlite3 & Drizzle) |
| [react-hot-toast](https://react-hot-toast.com) | Toast notifications (login/signup/logout/validation/protected-route) |
| Programming Hero BazarDor API | Product & category data (with 2 mirror fallbacks) |

---

## ✨ Key Features

1. **Live price dashboard** — "আজ দাম বেড়েছে ▲" (top 6 risers), "আজ দাম কমেছে ▼"
   (top 6 fallers) and "সব পণ্য" grid with all 33 products; every card shows emoji,
   name, unit, today's price in Bengali digits and a colored change badge
   (▲ green / ▼ red / — gray).
2. **Infinite price ticker** — a marquee strip below the navbar that scrolls
   `emoji + নাম + দাম টাকা/একক + ▲/▼ %` endlessly (pauses on hover).
3. **Market-wise product details (protected)** — `/product/[slug]` shows min / max /
   average price, price history, and a "বাজারভিত্তিক আজকের দাম" table of 12 markets
   across divisions. Requires login — guests are redirected with a toast.
4. **Category pages with smart sorting** — `/category/[slug]` shows a category header,
   count, skeleton loading state, and a "সাজান" dropdown
   (ডিফল্ট | দাম: কম থেকে বেশি | দাম: বেশি থেকে কম) that sorts numerically even
   though prices are displayed in Bengali numerals. Unknown categories get a
   friendly 404-style empty state.
5. **Full authentication flow with BetterAuth** — email/password sign-up & sign-in,
   Google + GitHub social login buttons, session-aware navbar (profile dropdown +
   sign-out), and toast notifications on success/error.
6. **Profile & update information** — `/profile` shows the logged-in user card;
   the "সম্পাদন করুন" button goes to `/profile/update` where the name can be
   updated via BetterAuth's `updateUser`.
7. **Custom 404 page** — any unknown route (e.g. `/product/unknown`) renders a
   friendly Bengali 404 with a "হোম পেজে ফিরে যান" button.
8. **Fully responsive** — 1 → 2 → 3 → 4 column grids, horizontally scrollable
   category strip, `btn-sm sm:btn-md` sizing and a `max-w-6xl` container work on
   mobile, tablet and desktop.
9. **Resilient data layer** — the public API is proxied through Next.js API routes
   with automatic fallback across the main URL and two mirror URLs, so the app
   keeps working if one endpoint is down. Dynamic routes also survive refresh
   after deployment (no hard 404 on Vercel).

---

## 🧭 Pages

| Route | Description |
| --- | --- |
| `/` | Hero banner + risers/fallers + all products |
| `/category/[slug]` | Category page with sort control |
| `/product/[slug]` | 🔒 Product details (min/max/avg + market table) |
| `/signin` | Login (email/password + social) |
| `/signup` | Registration |
| `/profile` | 🔒 Profile card |
| `/profile/update` | 🔒 Update name (C3) |
| anything else | Custom 404 |

---

## 🚀 Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

### Environment variables

Copy `.env.example` to `.env.local` (optional — email/password auth works without it):

```env
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
BETTER_AUTH_SECRET=any-long-random-string
SQLITE_PATH=            # defaults to ./bazar-dor.db (dev) or /tmp/bazar-dor.db (Vercel)
```

Users are stored in a local SQLite database (`bazar-dor.db`) that is created
automatically on first run — no migration command needed.

### Deploying to Vercel

Just import the repo — dynamic routes are rendered server-side, so refreshing
`/product/[slug]` after deployment works without errors. On Vercel the SQLite
file is placed in `/tmp` (ephemeral), which is fine for the assignment's
authentication demo.

---

## 📡 API Used

- All products: `GET /products`
- Single product: `GET /products/1`
- Categories: `GET /categories`
- Filter: `GET /products?category=chal`

Base URLs (tried in order): `openapi.programming-hero.com/api/bazardor`,
`api.api-store.workers.dev/api/bazardor`, `api.abcz.workers.dev/api/bazardor`.
