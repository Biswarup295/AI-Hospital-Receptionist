# AI Hospital Receptionist

AI Hospital Receptionist is a full-stack IBM SkillsBuild project that simulates a smart hospital front desk. Patients describe symptoms in natural language, the system classifies the likely ward, asks for missing details one at a time, shows a live summary card, stores final intake data, and can trigger a webhook after submission.

## Features

- Premium React + Tailwind homepage with futuristic healthcare styling
- Live chat intake page with:
  - patient and assistant chat bubbles
  - dynamic ward badge
  - emergency alert state
  - patient summary card
  - status tracker
  - browser voice input support
- FastAPI backend with:
  - `POST /api/chat`
  - `POST /api/submit`
  - `GET /api/patients`
  - `GET /api/health`
- LangGraph-driven intake workflow
- Rule-based, demo-stable ward classification
- Supabase persistence with in-memory fallback
- Webhook trigger with graceful failure handling
- Admin dashboard for submitted records

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: FastAPI, Pydantic
- Workflow: LangGraph
- Database: Supabase
- Automation: Webhook POST delivery

## Project Structure

```text
.
|-- backend
|   |-- app
|   |   |-- api
|   |   |-- core
|   |   |-- schemas
|   |   |-- services
|   |   |-- utils
|   |   `-- workflow
|   |-- .env.example
|   `-- requirements.txt
|-- docs
|   `-- supabase_schema.sql
|-- frontend
|   |-- src
|   |   |-- components
|   |   |-- data
|   |   |-- hooks
|   |   |-- pages
|   |   `-- services
|   |-- .env.example
|   `-- package.json
`-- README.md
```

## Architecture

1. The React frontend sends user messages to the FastAPI backend.
2. FastAPI forwards each message into a LangGraph intake workflow.
3. The workflow extracts details, classifies the ward, and determines the next clarification question.
4. The frontend updates the summary card and status tracker from the returned patient state.
5. Once all required fields are complete, the frontend submits the intake.
6. The backend saves the record to Supabase or an in-memory fallback and optionally triggers a webhook.

## Frontend Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Default frontend URL: `http://localhost:5173`

Environment variable:

- `VITE_API_BASE_URL=http://127.0.0.1:8000/api`

## Backend Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

Default backend URL: `http://127.0.0.1:8000`

Important backend env vars:

- `ALLOWED_ORIGINS`
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `SUPABASE_TABLE`
- `WEBHOOK_URL`
- `WEBHOOK_TIMEOUT_SECONDS`
- `USE_MEMORY_STORE`
- `FALLBACK_TO_MEMORY_ON_SUPABASE_ERROR`

## API Overview

### `POST /api/chat`

Request:

```json
{
  "session_id": "optional-session-id",
  "message": "I have chest pain and difficulty breathing"
}
```

Response fields:

- `session_id`
- `reply`
- `ward`
- `next_action`
- `patient_state`

### `POST /api/submit`

Request:

```json
{
  "session_id": "optional-session-id",
  "patient_name": "Rahul",
  "patient_age": 20,
  "patient_query": "Chest pain",
  "ward": "Emergency Ward"
}
```

### `GET /api/patients`

Returns submitted patient records for the admin dashboard.

### `GET /api/health`

Returns backend health plus Supabase and webhook readiness.

## Supabase

Run the SQL in `docs/supabase_schema.sql` to create the `patient_intakes` table.

For deployed persistence, set `SUPABASE_KEY` to a Supabase service role key on the backend and keep `FALLBACK_TO_MEMORY_ON_SUPABASE_ERROR=false` so insert failures are visible.

If Supabase credentials are not configured, the backend can fall back to an in-memory store so the demo can still run locally.

## Demo Flow

1. Open the homepage and launch the intake page.
2. Enter patient symptoms such as fever, anxiety, or chest pain.
3. Provide missing details when prompted.
4. Review the live summary card and ward badge.
5. Submit the intake.
6. Open the dashboard to view stored records.

## Future Scope

- Add authentication for staff-only dashboards
- Replace rule-based classification with LLM-assisted triage
- Add analytics for ward load patterns
- Connect webhook delivery to Relay, Slack, or hospital workflow tools
- Store chat transcripts for audit or training analysis
