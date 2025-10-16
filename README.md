# Prompter

Prompter is a small social-style Next.js app for discovering, creating and sharing AI prompts. It's built with the Next.js App Router, NextAuth for authentication and MongoDB (Mongoose) for persistence.

This README includes setup, features, the API surface and troubleshooting notes specific to this repository.

---

## Highlights / Features

- Create, update and delete prompt posts (server-side API routes).
- User authentication with NextAuth (OAuth providers supported).
- Search feed with debounced client-side filtering (by prompt text, tag or username).
- Click a tag to filter posts by that tag.
- View other users' public profiles and see their prompts.
- MongoDB + Mongoose models and API routes under `app/api/`.

---

## Quick start (local)

1. Install dependencies

```powershell
npm install
```

2. Create a `.env.local` in the project root with the environment variables below.

3. Run the dev server

```powershell
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Required environment variables

Create `.env.local` and add at least these values (replace placeholders):

```
MONGODB_URI="your-mongodb-connection-string"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="a-long-random-secret"
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

Notes:
- `MONGODB_URI` should be the Atlas (or local) connection string. If you see DNS/network errors (ENOTFOUND / ECONNREFUSED), check that the hostname is reachable from your machine and your Atlas IP whitelist is configured.

---

## Project structure (important files)

- `app/` — Next.js App Router pages and API routes.
	- `app/page.jsx` — home page (Feed component).
	- `app/create-prompt/page.js` — create prompt page.
	- `app/update-prompt/page.js` — edit prompt page (reads `?id=` search param).
	- `app/profile/[id]/page.js` — view other user's profile (dynamic route).
	- `app/api/prompt/route.js` — GET (all prompts, supports `?tag=`), POST, etc.
	- `app/api/prompt/[id]/route.js` — GET/PATCH/DELETE for a single prompt.
	- `app/api/users/[id]/posts/route.js` — returns posts for a given user id.
	- `app/api/auth/[...nextauth]/route.js` — NextAuth handlers.

- `components/` — reusable React components (Feed, PromptCard, Profile, Form, Navbar, Provider, etc.)
- `model/` — Mongoose models (`prompt.js`, `user.js`)
- `utils/database.js` — DB connection helper (connectDB)
- `hooks/useDebounce.js` — small hook used by `Feed` to debounce search input
- `public/assets/` — images and icons used by the site

---

## Search & Tag behavior

- The feed (`components/Feed.jsx`) fetches all prompts and uses a debounced input (`hooks/useDebounce.js`) to filter the in-memory list by prompt text, tag or username.
- Clicking a tag in `PromptCard` sets the search box to that tag and filters results immediately.
- For large datasets, move search to the server-side by calling `GET /api/prompt?tag=<tag>&q=<query>` and add appropriate query handling in `app/api/prompt/route.js`.

---

## Viewing other profiles

- Clicking a username navigates to `/profile/[id]` which fetches that user's posts (`/api/users/:id/posts`) and displays them via the `Profile` component.
- On that page clicking a tag shows unique users who have prompts with that tag (the UI filters results returned by `GET /api/prompt?tag=<tag>`).

---

## Common errors & troubleshooting

- OverwriteModelError: "Cannot overwrite `Prompt` model once compiled." — occurs when Mongoose models are re-registered during hot reload. Fix: export the model defensively in `model/prompt.js`:

```js
import mongoose, { Schema } from 'mongoose';
const PromptSchema = new Schema({...});
const Prompt = mongoose.models.Prompt || mongoose.model('Prompt', PromptSchema);
export default Prompt;
```

- MongoDB network errors (ENOTFOUND / ECONNREFUSED) — check `MONGODB_URI`, your internet/DNS, and Atlas IP whitelist.

- NextAuth OAuth callback errors ("State cookie was missing") — ensure `NEXTAUTH_URL` is correct and your browser is not blocking cookies; for local dev use `http://localhost:3000`.

- Username validation failed on sign-in — the `user` model enforces a username pattern (8–20 alphanumeric). Either provide valid usernames or update the validation in `model/user.js`.

---

## Development notes / tips

- Restart the dev server after environment changes.
- Avoid importing server-only modules (Mongoose models) into client components — models must only be used in API/server code.
- Use the `useDebounce` hook in `hooks/useDebounce.js` for any input where you want to delay work until typing stops.

---

## Run scripts

```powershell
npm run dev    # start development server
npm run build  # production build
npm run start  # start production server after build
```

---

## Want help?

If you'd like, I can:
- Add server-side search with pagination
- Add toasts/notifications for create/update/delete operations
- Wire up more OAuth providers and fallback username generation for OAuth users

If you want me to commit any of the optional improvements, tell me which one and I'll implement it.

---

License: MIT

Enjoy building with Prompter!

