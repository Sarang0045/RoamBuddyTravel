# AI Tourist Guide + Translator Bot

A full-stack AI-powered travel assistant that generates itineraries, finds nearby attractions, and translates languages.

## Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Leaflet
- **Backend:** FastAPI (Python), Uvicorn
- **AI/Mock:** Logic-based mock generator (ready for OpenAI integration)

## Setup & Run

### 1. Backend (FastAPI)

Open a terminal and run:

```bash
cd backend
# Create virtual environment (optional but recommended)
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start Server
uvicorn app.main:app --reload
```

The API will start at `http://localhost:8000`.

### 2. Frontend (React)

Open a **new** terminal and run:

```bash
cd frontend

# Install dependencies (if not done)
npm install

# Start Dev Server
npm run dev
```

Open `http://localhost:5173` in your browser.

## Features

- **Trip Planner:** Enter destination and budget to get a day-by-day itinerary.
- **Nearby Gems:** Uses your geolocation to find simulated nearby attractions on a map.
- **Translator:** Simple text translation tool (Mocked for demo).
- **History:** View past generated trips.

## Note

- This project currently uses **Mock Data** for Itineraries and Translations to allow testing without API keys.
- To enable real AI, uncomment OpenAI code in `backend/app/main.py` and `backend/app/itinerary_generator.py` and add your API Key.
