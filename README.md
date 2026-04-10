# VirtusReport

**Sport · Stories · Analysis** — virtusreport.com

A multilingual (EN/DE/FR/ES) sports journalism platform covering Football, Basketball, and MMA. Built with Next.js 14, Sanity CMS, Supabase, and React Native (app, Sprint 5+).

---

## Sprint 1 Setup — Step by Step

### 1. Register the domain
Go to [infomaniak.com](https://infomaniak.com) or [namecheap.com](https://namecheap.com) and register `virtusreport.com`.

### 2. Create accounts (all free to start)
- **GitHub** — [github.com](https://github.com) — create repo `virtusreport`
- **Vercel** — [vercel.com](https://vercel.com) — connect your GitHub account
- **Sanity** — [sanity.io](https://sanity.io) — create project, get project ID
- **Supabase** — [supabase.com](https://supabase.com) — create project, get URL + anon key
- **DeepL** — [deepl.com/pro-api](https://deepl.com/pro-api) — free tier (500k chars/month)

### 3. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/virtusreport.git
cd virtusreport
npm install
```

### 4. Environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in all values from your Sanity, Supabase, and DeepL accounts.

### 5. Supabase — run the schema

Go to your Supabase project → **SQL Editor** → **New Query**.
Paste the contents of `supabase_schema.sql` and click Run.

### 6. Sanity CMS

```bash
# Initialize your Sanity project (run once)
npx sanity init --project YOUR_PROJECT_ID --dataset production

# Start the CMS studio locally
npm run dev
# Then open http://localhost:3000/studio
```

Create your first author and article in the Sanity studio.

### 7. Run locally

```bash
npm run dev
# Open http://localhost:3000
# The browser language is auto-detected — test with /en, /de, /fr, /es
```

### 8. Deploy to Vercel

```bash
# Push to GitHub, then:
# Vercel → New Project → Import from GitHub
# Add all environment variables from .env.local
# Deploy
```

Connect your `virtusreport.com` domain in Vercel → Settings → Domains.

---

## Project Structure

```
virtusreport/
├── src/
│   ├── app/
│   │   └── [lang]/
│   │       ├── layout.tsx          # Root layout with fonts
│   │       ├── page.tsx            # Homepage
│   │       ├── [category]/
│   │       │   ├── page.tsx        # Category page (football/basketball/mma)
│   │       │   └── [slug]/
│   │       │       └── page.tsx    # Article detail
│   │       └── studio/[[...index]] # Sanity Studio (CMS)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Nav + language switcher
│   │   │   └── Footer.tsx
│   │   ├── article/
│   │   │   ├── HeroArticle.tsx     # Featured article
│   │   │   ├── ArticleCard.tsx     # Grid card
│   │   │   ├── ArticleGrid.tsx     # 3-col grid
│   │   │   └── CategoryRow.tsx     # Section with title
│   │   └── ui/
│   │       ├── VirtusLogo.tsx      # SVG logo — Option B
│   │       └── CategoryBadge.tsx   # Sport label pill
│   ├── lib/
│   │   ├── sanity.ts               # Sanity client + GROQ queries
│   │   └── supabase.ts             # Supabase client (browser + server)
│   ├── i18n.ts                     # next-intl config
│   └── styles/
│       └── globals.css             # VirtusReport design tokens
├── messages/
│   ├── en.json                     # English UI strings
│   ├── de.json                     # German
│   ├── fr.json                     # French
│   └── es.json                     # Spanish
├── sanity/
│   └── schemas/
│       ├── article.ts              # Article schema (with translations)
│       ├── author.ts               # Author schema
│       └── index.ts
├── sanity.config.ts                # Sanity Studio config
├── supabase_schema.sql             # Run once in Supabase SQL Editor
├── middleware.ts                   # i18n routing + language detection
├── next.config.js
├── tailwind.config.js              # VirtusReport Tailwind tokens
└── .env.local.example              # Copy to .env.local and fill in
```

---

## Design Tokens (from Brand Document)

| Token | Value | Usage |
|-------|-------|-------|
| `--vr-nero` | `#0D0D0D` | Primary background |
| `--vr-crimson` | `#C8102E` | THE accent — CTAs, labels, logo |
| `--vr-parchment` | `#F5F0E8` | Primary text |
| `--vr-steel` | `#6B6760` | Metadata, secondary text |
| `--vr-football` | `#1A6FA8` | Football category |
| `--vr-basketball` | `#C87310` | Basketball category |
| `--vr-mma` | `#A32D2D` | MMA category |

## Fonts

- **Playfair Display** — Headlines, Logo wordmark
- **Lora** — Article body text
- **DM Sans** — UI, navigation, labels

All loaded via `next/font/google` — zero layout shift, auto-optimised.

---

## Roadmap

| Sprint | Weeks | Focus |
|--------|-------|-------|
| ✅ 1 | 1–2 | Foundation — Next.js, Sanity, Supabase, Vercel |
| 2 | 3–4 | Website core — all pages, responsive |
| 3 | 5–6 | Content + features — i18n, DeepL, comments |
| 4 | 7–8 | Launch — performance, analytics, SEO |
| 5–7 | 9–16 | React Native app — iOS + Android |
