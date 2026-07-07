# Contest Reminder App

A full-stack web app that aggregates upcoming competitive programming contests from **Codeforces**, **LeetCode**, and **CodeChef** into one dashboard — with live countdowns, search, platform filters, favorites, and dark mode.

**Live demo:** [contest-reminder-app.vercel.app](https://contest-reminder-app.vercel.app)
*(Backend is on Render's free tier — the first request after inactivity may take 30–50s to wake up.)*

---

## Features

- JWT-based authentication (register/login) with protected routes
- Live dashboard aggregating contests from 3 platforms in real time
- Countdown timers, updated every second
- Search by contest name, filter by platform
- Save/remove favorite contests, with a dedicated Favorites page
- Dark mode with persistence across sessions
- Fully responsive, accessible UI

## Tech Stack

**Frontend:** React (Vite), Tailwind CSS, React Router, Axios, React Toastify, lucide-react
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Zod
**Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

## Architecture

The backend normalizes all three providers into a single contest shape, sorts by start time, and caches results in memory for 10 minutes — so the external APIs aren't hit on every page load, and one provider going down doesn't break the other two.

## Getting Started Locally

### Prerequisites
- Node.js 18+
- A MongoDB Atlas cluster (free tier is fine)

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/contest-reminder-app.git
cd contest-reminder-app
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# fill in .env with your own values — see table below
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Visit `http://localhost:5173`.

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the server runs on | `5000` |
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster0.mongodb.net/contest-reminder` |
| `JWT_SECRET` | Secret used to sign JWTs (generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`) | `a1b2c3...` |
| `JWT_EXPIRES_IN` | Token expiry duration | `7d` |
| `CLIENT_URL` | Frontend origin, used for CORS | `http://localhost:5173` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:5000/api` |

## API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Log in, returns a JWT |
| GET | `/api/auth/me` | Yes | Get current user |
| GET | `/api/contests` | No | Get all upcoming contests (cached, 10-min TTL) |
| GET | `/api/favorites` | Yes | Get the current user's favorite contests |
| POST | `/api/favorites/:contestId` | Yes | Add a contest to favorites |
| DELETE | `/api/favorites/:contestId` | Yes | Remove a contest from favorites |

## Known Limitations

These are deliberate scope decisions for a focused resume project, not oversights:

- LeetCode and CodeChef don't publish official public APIs — this app uses their community-documented endpoints, which could change without notice
- No email verification, OAuth, or admin panel — out of scope by design
- Contest cache is in-memory and resets on server restart — acceptable at this scale; Redis would be over-engineering here
- Render's free tier spins down after inactivity, causing a cold-start delay on the first request

## License

MIT