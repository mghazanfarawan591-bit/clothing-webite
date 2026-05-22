# Hareem garments — Premium Clothing

Scaffolded Next.js + Tailwind e-commerce demo for "Hareem garments" with Stripe checkout and admin upload-ready flow.

Quick start:

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` with the following keys:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
ADMIN_PASSWORD=changeme
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_UPLOAD_PRESET=unsigned_preset (optional)
```

3. Run development server:

```bash
npm run dev
```

Notes:
- This demo uses a JSON file as product storage (`data/products.json`). For production, use a proper database (Postgres).
- Image uploads are intended for Cloudinary (client-side unsigned uploads) — update `pages/api/upload` if you prefer server-side uploads to S3.

Deployment (Vercel)
-------------------

1. Install `vercel` CLI or link your GitHub repo in the Vercel dashboard.
2. Set the following environment variables in Vercel (same as `.env.example`):
	- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
	- `STRIPE_SECRET_KEY`
	- `ADMIN_PASSWORD`
	- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (optional)
	- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` (optional)
	- `NEXT_PUBLIC_HOST` (set to your deployed URL)

3. Deploy via CLI:

```bash
vercel --prod
```

Or push to GitHub and use Vercel's Git integration. After deployment, confirm the env vars are set in the Vercel project settings.

Favicon & meta tags
- A `favicon.svg` and social meta tags were added to `pages/_app.js`.

# clothing-webite
i want create a website for my shop
