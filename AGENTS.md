# Agents Guide — v2-fumi-web

## Tech Stack

- **Framework**: Next.js 16.2.9 (App Router only — no Pages Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (PostCSS)
- **Font**: Geist Mono (via `geist/font/mono` — local, not Google Fonts)
- **Animation**: framer-motion
- **Runtime**: Bun

## Project Structure

```
app/
├── routes.ts                      # Central route registry (single source of truth)
├── layout.tsx                     # Root layout — GridBackground + Navbar + children
├── page.tsx                       # Home page — DiscordWidget at right center
├── globals.css                    # Tailwind imports, theme variables, keyframes
├── api/discord/[[...path]]/       # (deleted) — rewrites handle this now
├── components/
│   ├── DiscordWidget.tsx          # Discord presence widget
│   └── discord/
│       ├── StatusBadge.tsx         # Online/idle/dnd/offline dot
│       ├── SpotifyCard.tsx         # Now-playing card
│       └── ActivityCard.tsx        # Activity card + cycling
├── hooks/
│   └── useDiscordPresence.ts      # SSE + polling presence hook
├── lib/discord/
│   ├── types.ts                   # DiscordPresence, SpotifyData, etc.
│   ├── api.ts                     # Fetch wrappers for /api/discord/*
│   ├── sse.ts                     # SSE manager with reconnection
│   └── url.ts                     # CDN URL normalizer
├── music/page.tsx
├── projects/page.tsx
├── github/page.tsx
├── navbar/[route]/page.tsx        # Dynamic SSG page per route
├── (api/discord handled by next.config.ts rewrites)
components/
├── Navigation.tsx                  # Fixed left sidebar (180px)
└── GridBackground.tsx              # Full-screen grid with mouse spotlight
```

## Route Registry

Every navigation item lives in **`app/routes.ts`** — the single source of truth.

```ts
// app/routes.ts
export interface AppRoute {
  name: string;
  href: string;
  description?: string;
}
```

- Navbar reads from `appRoutes`
- Adding a new page = 1 entry in `appRoutes` + 1 `page.tsx` in a folder
- No hardcoded routes anywhere else

## Navbar (components/Navigation.tsx)

- **Position**: `fixed left-0 top-0`, full viewport height
- **Width**: `w-[180px]`
- **Background**: transparent (page background `#0b0b0f` shows through)
- **Font**: Geist Mono (`font-mono`, set via `GeistMono.variable` CSS variable)
- **Alignment**: Vertically centered (`justify-center`), no profile section
- **Border**: none (separator removed)
- **Mobile**: Hamburger button at top-left, sidebar slides in/out, dark overlay
- **Active state**: `[ PageName ]` — brackets wrapped around the name, `text-white`
- **Inactive state**: `— PageName` — em dash prefix, `text-zinc-500`
- **Hover**: `text-zinc-300`, only `transition-colors duration-200`

```tsx
// Active link renders as:
<span>[ </span>PageName<span> ]</span>

// Inactive link renders as:
<span className="text-zinc-500">—</span>PageName
```

## Layout (app/layout.tsx)

- Body: `bg-[#0b0b0f] text-[#9ca3af] md:pl-[200px]`
- Render order: `GridBackground` → `Navbar` → content `<div>`
- GridBackground at `z-0`, Navbar at `z-50`, content at `z-10`
- Geist Mono variable applied at `<html>` level (global)

## Page Content (app/page.tsx)

- Home page shows `<DiscordWidget showSpotify={false} />` at right center
- Uses `flex min-h-screen items-center justify-end`
- `userId` is passed from server-side `process.env.DISCORD_USERID`

## Discord Integration

### API Proxy

Configured in `next.config.ts` via rewrites — no route handler:

```ts
{
  source: "/api/discord/:path*",
  destination: "https://api.applefumi.xyz/v2/discord/:path*",
}
```

### Environment Variables

`.env.local`:
```
DISCORD_USERID=969088519161139270
```

Exposed globally via `next.config.ts` `env` block.

### Components

- **DiscordWidget**: Main widget — shows avatar, username, status, custom status. Accepts `showSpotify`, `showActivities`, `userId`, etc.
- **StatusBadge**: Colored dot with pulse animation for online status
- **SpotifyCard**: Album art + song/artist/album (hidden on home page)
- **ActivityCard**: Activity icon + name + details + timestamps

### Data Flow

1. `DiscordWidget` → `useDiscordPresence(userId)`
2. Hook fetches initial presence via `fetchDiscordPresence()` → `GET /api/discord/users/{id}`
3. Opens SSE connection to `/api/discord/users/{id}/live` for real-time updates
4. Polls every 5s as fallback
5. Proxy rewrites `/api/discord/*` → `https://api.applefumi.xyz/v2/discord/*`

## Styling Conventions

- **Global font**: Geist Mono (`--font-sans` and `--font-mono` both point to `--font-geist-mono`)
- **Background**: `#0b0b0f` (body), `#020817` (CSS variable)
- **Text**: `#9ca3af` (default), `#ffffff` (active/white)
- **Accent**: `#ffffff` for active nav items
- **No custom Tailwind colors defined** — use inline hex or zinc/gray scale
- **No light mode** — dark terminal aesthetic only
- `@theme inline` block in globals.css for font tokens

## Git Conventions

- Branch: `main`
- Remote: `https://github.com/cltq/v2.git`
- **One commit per logical change** — no squashing unrelated work
- Commit messages are short, lowercase, descriptive: `"add discord presence library and hooks"`
- Always verify with `npm run build` before committing
- Push after every commit: `git push origin main`

## Next.js 16 Notes

- `params` in dynamic routes is a `Promise` — must be awaited
- App Router only — no `getStaticProps`, `getServerSideProps`, etc.
- Use `generateStaticParams` for SSG dynamic routes
- Server Components by default — add `"use client"` for interactivity
- `next/font/google` → replaced by `geist` package for local fonts
- CSS Modules not used — all styling via Tailwind
- `process.env` without `NEXT_PUBLIC_` prefix only available server-side unless explicitly exposed in `next.config.ts` `env` block
