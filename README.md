# BFHL Full-Stack Project

Full-stack project with:
- Backend: Node.js + Express
- Frontend: React + Vite
- Deployment-ready setup for Render (backend) and Vercel (frontend)

## Project Structure

```text
backend/
  src/
    config/
    routes/
    services/
    utils/
frontend/
  src/
    components/
```

## Backend Features

- `POST /bfhl` endpoint
- CORS enabled
- Strict edge validation:
  - Only `X->Y` with single uppercase letters
  - Trims whitespace before validation
  - Rejects self loops and malformed edges
- Duplicate edge tracking:
  - First edge is accepted
  - Later duplicates reported in `duplicate_edges` once
- Directed graph construction with one-parent rule
- Root detection per component
- Cycle detection handling with required response format
- Tree construction + depth calculation
- Summary generation:
  - `total_trees`
  - `total_cycles`
  - `largest_tree_root` (depth first, lexicographic tie-break)

## Frontend Features

- Input textarea for comma-separated edges
- Configurable backend API URL
- Submit button and loading state
- Error handling for failed API calls
- Clean card-based UI
- Displays:
  - identity fields
  - hierarchy cards
  - diagnostics
  - raw JSON response

## Local Setup

## 1) Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:3000`.

## 2) Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on Vite default URL (usually `http://localhost:5173`).

## API Contract

### Endpoint

`POST /bfhl`

### Request

```json
{
  "data": ["A->B", "A->C", "B->D"]
}
```

### Response Shape

```json
{
  "user_id": "fullname_ddmmyyyy",
  "email_id": "valid_college_email",
  "college_roll_number": "string",
  "hierarchies": [],
  "invalid_entries": [],
  "duplicate_edges": [],
  "summary": {
    "total_trees": 0,
    "total_cycles": 0,
    "largest_tree_root": ""
  }
}
```

## Deployment

## Backend on Render

1. Push repo to GitHub.
2. Create a new **Web Service** on Render from this repo.
3. Root directory: `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variable if needed:
   - `PORT` (Render usually injects this automatically)
7. Deploy and copy backend URL, for example:
   - `https://your-backend.onrender.com`

## Frontend on Vercel

1. Import the same repo in Vercel.
2. Set root directory to `frontend`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable:
   - `VITE_API_URL=https://your-backend.onrender.com/bfhl` (optional, if you want to wire env-based URL later)
6. Deploy.

## Notes

- The app is designed to process up to 50 nodes well under 3 seconds with current O(V+E) graph traversal.
- Backend logic is modular and easy to test:
  - validation and normalization
  - edge processing
  - hierarchy building
