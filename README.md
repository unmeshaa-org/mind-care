# Mind Care Counseling (Next.js)

A Next.js 14 project for a mental health counseling website with blog, appointment booking, Supabase backend, admin dashboard, and integrated SEO + AdSense.

---

## 🚀 Setup (Local)

### 1) Clone

```bash
git clone <repo-url> mind-care
cd mind-care
```

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

Create a `.env.local` file in the project root with the following values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_SUPABASE_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY

# Admin Dashboard
ADMIN_USERNAME=admin
ADMIN_PASSWORD=supersecret
ADMIN_SESSION_SECRET=some-long-random-string

# Google Analytics
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX

# Optional: AdSense (for ad script placeholder)
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT=XXXXXXXXXX
```

> **Important:** Keep `.env.local` private. Do not commit it to version control.

### 4) Run locally

```bash
npm run dev
```

Open http://localhost:3000

---

## 🗄️ Supabase Configuration

### 1) Create a project

- Go to https://app.supabase.com and create a new project.

### 2) Create schema

Create tables (via SQL editor or table UI):

#### `blogs`
- `id` (uuid, primary key, default `gen_random_uuid()`)
- `title` (text)
- `slug` (text, unique)
- `cover_image` (text)
- `meta_description` (text)
- `publish_date` (date)
- `published` (boolean)
- `author_name` (text)
- `author_bio` (text)
- `author_avatar_url` (text)
- `author_twitter_handle` (text)
- `author_website` (text)
- `tags` (text[])
- `content` (jsonb)

#### `slots`
- `id` (uuid, primary key, default `gen_random_uuid()`)
- `start_time` (timestamp)
- `end_time` (timestamp)
- `is_booked` (boolean)

#### `appointments`
- `id` (uuid, primary key, default `gen_random_uuid()`)
- `slot_id` (uuid, foreign key -> slots.id)
- `name` (text)
- `email` (text)
- `phone` (text)
- `notes` (text)
- `created_at` (timestamp, default `now()`)

#### `contact_messages`
- `id` (uuid, primary key, default `gen_random_uuid()`)
- `name` (text)
- `email` (text)
- `phone` (text)
- `message` (text)
- `created_at` (timestamp, default `now()`)

### 3) API keys

- Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from the Supabase project settings.
- Set `SUPABASE_SERVICE_ROLE_KEY` from the Service API keys (used server-side only).

---

## 📌 Environment Variables

| Name | Purpose |
|------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (public) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (public) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |
| `ADMIN_USERNAME` | Admin dashboard username |
| `ADMIN_PASSWORD` | Admin dashboard password |
| `ADMIN_SESSION_SECRET` | Secret used to sign admin session cookie |
| `NEXT_PUBLIC_GA_TRACKING_ID` | Google Analytics tracking ID |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Google AdSense client ID (optional) |
| `NEXT_PUBLIC_ADSENSE_SLOT` | Google AdSense slot ID (optional) |

---

## 📈 Google Analytics Setup

1. Create a GA4 property at https://analytics.google.com/
2. Copy the Measurement ID (starts with `G-...`).
3. Set `NEXT_PUBLIC_GA_TRACKING_ID` in `.env.local`.

> The app only loads GA when `NODE_ENV=production`.

---

## 🧾 Google AdSense Setup

1. Sign up at https://www.google.com/adsense/
2. Get your `ca-pub-...` client ID and ad slot IDs.
3. Add them to `.env.local`:

```env
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT=XXXXXXXXXX
```

4. Update `components/adsense/AdSensePlaceholder.tsx` with your AdSense initialization script.

---

## 🚀 Deploying to Vercel

1. Push your repo to GitHub (or Git provider).
2. Create a new Vercel project and connect it to the repo.
3. In Vercel settings, add the same environment variables as `.env.local`.
4. Deploy.

> Vercel automatically handles Next.js builds and enables static/SSR optimizations.

---

## 🧩 Admin Dashboard

- Visit `/admin` and log in with your `ADMIN_USERNAME`/`ADMIN_PASSWORD`.
- Manage blog posts, appointment slots, and view messages/appointments.

---

## 🛠️ Notes / Tips

- For performance, the site uses Next.js image optimization and static generation.
- If you want a better editor for blog content, consider adding Markdown support (e.g., `react-markdown`).
- Keep `ADMIN_SESSION_SECRET` long and random.
