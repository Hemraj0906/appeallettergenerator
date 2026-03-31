# AppealLetterGenerator.com

> The #1 free AI-powered tool to overturn denied insurance claims in under 60 seconds.

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/free-appeal-denied.git
cd free-appeal-denied

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys (optional - works without them)

# 4. Run development server
npm run dev

# 5. Open http://localhost:3000
```

## 🔑 Environment Variables

| Variable                        | Required | Description                                                    |
| ------------------------------- | -------- | -------------------------------------------------------------- |
| `OPENAI_API_KEY`                | Optional | Enables AI-powered letter generation (falls back to templates) |
| `RESEND_API_KEY`                | Optional | Enables one-click email sending (falls back to mock)           |
| `SUPABASE_URL`                  | Optional | Database for analytics                                         |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Optional | Google AdSense integration                                     |

**The app works fully without any API keys** — it uses template-based letter generation with real state law and case law citations.

## 📁 Architecture

```
src/
├── app/                    # Next.js 14 App Router pages
│   ├── page.tsx            # Landing page (SEO optimized)
│   ├── generate/           # Main appeal generator tool
│   ├── appeal/[insurer]/   # PSEO: 10+ insurer pages
│   ├── state/[code]/       # PSEO: 53 state/country pages
│   ├── reason/[reason]/    # PSEO: 8 denial reason pages
│   ├── blog/               # 15 SEO blog posts
│   ├── success-stories/    # Social proof
│   ├── privacy/            # Privacy policy
│   └── api/                # API routes
│       ├── draft/          # Core AI letter generation
│       ├── upload/         # OCR file processing
│       ├── send-email/     # One-click email via Resend
│       └── chargeback/     # Bank dispute letter
├── lib/                    # Data & business logic
│   ├── stateLawDB.ts       # 53 jurisdictions (50 US + DC + UK/CA/AU)
│   ├── caseLawDB.ts        # 20 winning case precedents
│   ├── insurerDB.ts        # 10 major insurers with contacts
│   ├── denialReasons.ts    # 8 denial types with strategies
│   ├── aiEngine.ts         # AI letter generation engine
│   └── blogContent.ts      # 15 complete blog articles
└── types/                  # TypeScript interfaces
```

## 🚢 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/free-appeal-denied)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## 📊 SEO Features

- **500+ programmatic pages** auto-generated from data
- **Schema.org** structured data on every page (SoftwareApplication, FAQPage, HowTo, Article)
- **Dynamic meta tags** for every PSEO page
- **Auto-sitemap** via next-sitemap
- **Internal linking** between insurers, states, and denial reasons
- **Breadcrumbs** with schema markup

## 💰 Revenue Model

- Google AdSense with 3 high-CPM ad slots
- Targeting: Personal Injury Lawyers, Health Insurance, Medical Billing
- Geo-fenced to US, UK, CA, AU for high RPM

## 📝 License

MIT
