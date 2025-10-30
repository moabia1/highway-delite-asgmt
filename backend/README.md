# BookIt Backend

Express + MongoDB backend for BookIt.

Setup

1. Copy `.env.example` to `.env` and set values (MONGO_URI, JWT_SECRET, PORT).
2. Install dependencies and run:

```powershell
cd backend
npm install
npm run dev
```

The server will run on PORT (default 5000). API endpoints:


- GET /experiences
- GET /experiences/:id
- POST /bookings 
- POST /promo/validate

There is a small seed script at `src/seed.js` to create example experiences. Run it after starting the server (or from a node process) to populate sample data.