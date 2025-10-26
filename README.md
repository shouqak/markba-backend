# Markba Backend

Express + TypeScript backend that handles GitHub OAuth and exposes a simple auth endpoint for exchanging an authorization code for a user access token and profile.

## Quick Start

- Prerequisites: Node.js 18+ and npm
- Install: `npm install`
- Copy env: create a `.env` file (see Environment below)
- Run (dev): `npm run dev`
- Build: `npm run build`
- Start (prod): `npm start`

By default the server listens on `https://markba-backend.onrender.com`.

## Scripts

- `npm run dev` – Starts with nodemon + ts-node, watches `.ts` files.
- `npm run build` – Compiles TypeScript to `dist/`.
- `npm start` – Runs compiled app from `dist/server.js`.
- `npm run typecheck` – Type-checks without emitting.

## Environment

Create a `.env` file in the project root with the following variables:

```
# Server
PORT=4000

# CORS: your frontend origin
CLIENT_URL=http://localhost:3000

# GitHub OAuth App credentials
GITHUB_CLIENT_ID=your_github_oauth_app_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_app_client_secret
```

Notes
- `CLIENT_URL` is required so the server accepts cross-site cookies/requests from your frontend.
- `PORT` defaults to `4000` if not set.

## OAuth (GitHub) Setup

This backend expects the frontend to complete the browser redirect flow, then POST the received `code` to the backend.

1) Create a GitHub OAuth App
- Navigate: Settings → Developer settings → OAuth Apps → New OAuth App
- Application name: your app name
- Homepage URL: your frontend URL (e.g., `http://localhost:3000` while developing)
- Authorization callback URL: a frontend route that handles the GitHub callback and extracts the `code` (e.g., `http://localhost:3000/auth/callback`)

2) Configure environment variables
- Copy the App’s `Client ID` to `GITHUB_CLIENT_ID`
- Generate a new `Client Secret` and set `GITHUB_CLIENT_SECRET`
- Set `CLIENT_URL` to match your frontend origin

3) Frontend → Backend exchange
- After redirect back to your frontend, grab the `code` query param
- POST it to this backend at `POST /auth/github` with JSON body: `{ "code": "..." }`
- On success, you receive `{ token, user }` where `user` includes `name`, `email`, `avatar`, `provider: "github"`

Security tips
- Include an OAuth `state` parameter from the frontend to prevent CSRF.
- Lock down `CLIENT_URL` to trusted origins only.

## API

- `GET /` – Health check, returns a welcome string.
- `POST /auth/github`
  - Body: `{ "code": string }`
  - Response: `{ token: string, user: { name, email, avatar, provider } }`

## CORS

The server enables CORS with credentials and allows the origin at `CLIENT_URL`. If `CLIENT_URL` is not set, it falls back to a specific production URL in `server.ts`.

## Live URL 

If you deploy this backend, add your live URL here for convenience:

- Backend: https://markba-backend.onrender.com
- Frontend: https://markba-task-7sij.vercel.app

## Project Structure

- `server.ts` – App entry, Express setup, CORS/cookies, routes registration.
- `routes/authRoutes.ts` – GitHub OAuth code exchange and user fetch.
- `dist/` – Build output after `npm run build`.

