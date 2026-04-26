# URL Shortener Frontend

Frontend application for a URL shortener built with **Next.js**, **Tailwind CSS**, and **Supabase**.
This project provides a modern and responsive interface for users to authenticate, create, and manage shortened links, with full support for local development using **Supabase via pnpx**.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase
- pnpm

## Features

- User authentication with Supabase
- Create shortened URLs
- List user links
- Edit and delete links
- Responsive UI
- Visual feedback for user actions
- Integration with backend/API
- Local database setup with Supabase migrations

## Prerequisites

Make sure you have the following installed:

- Node.js (latest stable)
- pnpm
- Docker

## Installation

```bash
git clone https://github.com/ScriptCamilo/url-shortener-client.git
cd url-shortener-client
pnpm install
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_local_anon_key
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Running Supabase Locally (pnpx)

```bash
pnpx supabase start
pnpx supabase db reset
```

After starting, copy the API URL and anon key to `.env.local`.

## Running the Project

```bash
pnpm dev
```

http://localhost:3000

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Production Build

```bash
pnpm build
pnpm start
```

## Deployment

Deploy on Vercel with proper environment variables configured.

## Notes

- Ensure Docker is running before `pnpx supabase start`
- Re-run migrations if needed:

```bash
pnpx supabase db reset
```
