
# Menu Website (React + TypeScript + Vite)

This repository is a small, production-oriented front-end for a restaurant website that showcases a menu sourced from a Google Sheets CSV export. It uses Vite + React + TypeScript and includes performance and UX improvements such as lazy-loading images, GSAP scroll smoothing/animations, and a small in-memory caching layer for menu data.

Table of contents
- Features
- Quick start
- Environment
- Available scripts
- Project structure (high level)
- Notable implementation details
- Suggestions and roadmap (future improvements)

Features
- Client-side SPA built with React, TypeScript and Vite
- TailwindCSS-driven styling and utility classes
- Routing with react-router-dom and code-splitting via React.lazy + Suspense
- Smooth scrolling & scroll-triggered animations using GSAP (ScrollSmoother / ScrollTrigger)
- Carousel/slider UI using Swiper (with configurations in `src/config/carousel.ts`)
- Menu data fetched from a Google Sheets CSV (parsed with PapaParse)
- Robust data access layer: `GoogleSheetsService` + `MenuService` singletons with caching, category grouping, prefetch and search utilities
- Image optimizations: lightweight helpers to resize/optimize image URLs + lazy loading via `react-lazy-load-image-component`
- UX helpers: skeleton loader, error boundary, and focused accessibility-friendly components

Quick start
1. Install dependencies

```cmd
npm install
```

2. Create a `.env` file in the project root and set the Google Sheets CSV export URL (required):

Example `.env` (root):

```text
VITE_GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/<SHEET_ID>/export?format=csv&gid=<GID>
```

3. Run the app in development mode

```cmd
npm run dev
```

Open http://localhost:5173 (or the port Vite reports) in your browser.

Environment / required variables
- `VITE_GOOGLE_SHEET_URL` — CSV export URL for the menu spreadsheet. The app will throw at startup if this variable is missing (see `src/config/env.ts`).

Available scripts
- `npm run dev` — start Vite dev server
- `npm run lint` — run ESLint checks

Project structure (important files)
- `src/App.tsx` — top-level app, router and GSAP ScrollSmoother initialization
- `src/pages` — page-level routes (Home, Menu, About, NotFound)
- `src/components` — presentational and feature components (menu carousel, hero, reservation, header/footer, loaders)
- `src/services` — data access layer
  - googlesheets.ts — CSV fetching + caching using PapaParse
  - menuService.ts — business logic, caching, category grouping, search, prefetch
- `src/hooks` — custom hooks (useMenu, useScrollAnimation)
- `src/config` — content, routes, carousel defaults and design tokens
- public/ — static images used by the app (plates, members, fallback images)

Notable implementation details
- Data source: The menu is provided as a CSV (Google Sheets export) parsed with PapaParse; the URL is injected via VITE_GOOGLE_SHEET_URL.
- Caching: `GoogleSheetsService` implements a cache for the fetched CSV; `MenuService` adds an in-memory category cache and exposes prefetch/search utilities. Cache duration is configurable via `src/config/carousel.ts` (performanceConfig.cacheTimeout is used when constructing the service).
- Performance: images are lazy loaded and some are preloaded for the carousel; GSAP ScrollSmoother provides a polished scroll experience; Swiper configurations include virtual slides support for large datasets.
- UX: components use skeleton loaders and an ErrorBoundary to surface loading and error states gracefully.

Suggestions / Roadmap (possible improvements)
- Tests
  - Add unit tests for services and hooks (Jest + React Testing Library)
  - Add E2E tests (Playwright or Cypress) for critical flows (menu listing, category filtering, reservation form)
- CI / CD
  - Add GitHub Actions for lint, typecheck, tests and build
  - Deploy previews for PRs (Vercel, Netlify or similar)
- Data & API
  - Move to a proper headless CMS or small JSON API to avoid exposing the CSV URL and improve access control
  - Add rate-limiting and server-side caching if a backend is introduced
- Accessibility & Internationalization
  - Run axe/pa11y checks and fix issues (ARIA, keyboard nav, color contrast)
  - Add i18n support (react-i18next) to prepare for multi-language content
- PWA & Offline
  - Add a service worker to cache static assets and API responses for offline support and fast repeat visits
- Performance
  - Add image CDN or signed URLs and automatic resizing (e.g., Cloudinary, Imgix, or built-in image resizing on the server)
  - Consider SSR/SSG (Vite SSR, Next.js) for faster first paint and SEO (menu pages and category pages could be pre-rendered)
- Developer Experience
  - Add Storybook for isolated component development and visual regression tests
  - Add a CONTRIBUTING.md and CODEOWNERS if this becomes a team project
- Security & Privacy
  - Move secret config out of the public repo (do not commit real sheet URLs) and avoid exposing sensitive endpoints

Contributing
- Feel free to open issues or PRs. If you plan to make larger changes (switching data source, adding SSR), open an issue first to discuss the approach.

License
- This repository doesn't include a license file. Add one (MIT, Apache-2.0, etc.) if you plan to share or publish widely.

Acknowledgements
- Built with Vite + React + TypeScript. Uses Swiper, GSAP and PapaParse.

