**Purpose**
- **Short:** Help AI coding agents get productive quickly in this repository (Full-Stack MERN e-commerce).
- **Where to look first:** `server/` (backend API), `client/` (React+Vite frontend), `client/src/slices` (RTK Query usage).

**Big Picture**
- **Architecture:** Classic MERN split: `server/` (Express + Mongoose REST API) and `client/` (React + Vite + Redux Toolkit). API endpoints live under `/api/*` and are proxied by Vite during frontend development.
- **Data flow:** Frontend uses RTK Query (`client/src/slices/apiSlice.js`) to call backend routes (`server/routes/*`) which use controllers in `server/controllers/*` and mongoose models in `server/models/*`.

**How to run locally (developer quick commands)**
- **Start frontend:**
  - `cd client; npm install` (first time)
  - `cd client; npm run dev` — starts Vite dev server. Vite proxies `/api` to `http://127.0.0.1:5000` per `vite.config.js`.
- **Start backend:**
  - `cd server; npm install` (first time)
  - From the `server` folder: `npx nodemon server.js` (recommended) or `node server.js`.
  - Ensure env vars are set: `MONGO_URI` and `JWT_SECRET` (use a `.env` in `server/`).
- **Seed DB:** From `server/`: `node seeder.js` (imports sample users/products). Use `node seeder.js -d` to destroy.

**Project-specific conventions & patterns**
- **API base & proxy:** `client/src/constants.js` sets `BASE_URL` to `''` and routes like `PRODUCTS_URL = '/api/products'`. Vite proxy (`client/vite.config.js`) forwards `/api` to the backend — do not hardcode backend origin in client code.
- **RTK Query + tag-based cache:** The app uses a central `apiSlice` (`client/src/slices/apiSlice.js`) with `tagTypes` and injects endpoints from domain slices (e.g., `productsApiSlice.js`). Look for `providesTags` and `invalidatesTags` — these control automatic refetching (e.g., `createProduct` invalidates `['Product']`).
- **Auth:** Token injection is handled in `apiSlice.prepareHeaders` — tokens come from `state.auth.userInfo.token`. Backend uses JWT-based middleware in `server/middleware/authMiddleware.js` with `protect` and `admin` guards.
- **Error handling:** Controllers use `express-async-handler`; global `notFound` and `errorHandler` live in `server/middleware/errorMiddleware.js` and are mounted in `server/server.js`.
- **Routes & controllers mapping:** Routes are simple and map to controller functions. Example: `GET /api/products` → `server/controllers/productController.getProducts`.

**Files to consult for common tasks (hotspots)**
- **Start here:** `server/server.js`, `client/vite.config.js`, `client/src/constants.js`.
- **API wiring & auth:** `server/routes/*`, `server/controllers/*`, `server/middleware/authMiddleware.js`, `server/config/db.js`.
- **Frontend API usage:** `client/src/slices/apiSlice.js`, `client/src/slices/productsApiSlice.js`, and other `*ApiSlice.js` files under `client/src/slices`.
- **Redux state slices:** `client/src/slices/{authSlice.js,cartSlice.js}` for conventions on state keys (e.g., `auth.userInfo`).

**Common developer actions and examples**
- **Add a new API endpoint:**
  - Create a controller method in `server/controllers/*`, expose route in `server/routes/*`, then call from frontend via a new RTK Query endpoint injected into `apiSlice`.
- **Frontend: fetching & invalidation example:** `productsApiSlice.getProducts` uses `providesTags: ['Product']`; admin mutations set `invalidatesTags: ['Product']` so lists refetch automatically.
- **Attach auth to requests:** `apiSlice.prepareHeaders` sets `authorization: Bearer <token>` where token is sourced from `state.auth.userInfo.token`.

**Environment and debugging notes**
- **Environment:** Backend requires `MONGO_URI` and `JWT_SECRET`. Place a `.env` in `server/` when developing.
- **Debugging the API:** Start backend with `npx nodemon server.js` so code changes reload. Watch console logs in `server/server.js` and DB connect messages from `server/config/db.js`.
- **CORS/proxy:** Client uses Vite proxy; if calling backend directly (not via Vite), ensure CORS is allowed (server uses `cors()` already).

**What not to change without checks**
- Avoid changing `client/src/constants.js` `BASE_URL` unless updating `vite.config.js` proxy as well.
- Do not remove tag names in `apiSlice.tagTypes` without ensuring corresponding `providesTags`/`invalidatesTags` usage is updated across slices.

**Where to add tests & scaffolding**
- There are no automated tests in the repo. If you add tests, place frontend tests in `client/` and backend tests in `server/`. Keep API contract behavior consistent with controllers and RTK Query shapes.

If anything here is unclear or you'd like additional examples (for instance: adding a new RTK Query endpoint, protecting a route, or a sample `.env`), tell me which one and I'll expand or add snippets.
