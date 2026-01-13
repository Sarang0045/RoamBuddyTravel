from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
import uvicorn
import os

from .models import TripInput, TranslationInput, LocationInput
from .itinerary_generator import generate_mock_itinerary, get_nearby_places_mock

app = FastAPI(title="AI Tourist Guide API")

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock database for history
fake_history_db = []

@app.get("/")
def read_root():
    return {"message": "AI Tourist Guide API is running"}

@app.post("/api/plan-trip")
def plan_trip(input_data: TripInput):
    """
    Generates a trip itinerary. 
    In a real app, this would call OpenAI API. 
    Here it returns a sophisticated mock.
    """
    try:
        # In future: integration with OpenAI
        # response = openai.ChatCompletion.create(...)
        
        itinerary = generate_mock_itinerary(input_data)
        
        # Save to history automatically for demo
        fake_history_db.append({
            "place": input_data.place,
            "days": input_data.days,
            "budget": input_data.budget,
            "summary": itinerary["trip_summary"]
        })
        
        return itinerary
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/nearby")
def nearby_places(location: LocationInput):
    """
    Returns nearby places based on coordinates.
    """
    return {
        "location": {"lat": location.latitude, "lng": location.longitude},
        "places": get_nearby_places_mock(location.latitude, location.longitude)
    }

@app.post("/api/translate")
def translate_text(data: TranslationInput):
    """
    Mock translator. 
    """
    # Simple Mock Logic
    translations = {
        "hello": {"es": "hola", "fr": "bonjour", "hi": "namaste", "de": "hallo"},
        "thank you": {"es": "gracias", "fr": "merci", "hi": "dhanyavad", "de": "danke"},
        "where is the bathroom?": {"es": "¿dónde está el baño?", "fr": "où sont les toilettes ?", "hi": "shauchalaya kahan hai?", "de": "wo ist die toilette?"}
    }
    
    text_lower = data.text.lower().strip()
    target = data.target_lang.lower()
    
    if text_lower in translations and target in translations[text_lower]:
        translated = translations[text_lower][target]
    else:
        # Fallback for unknown text
        translated = f"[Simulated Translation to {data.target_lang}]: {data.text}"
        
    return {"original": data.text, "translated": translated, "source": data.source_lang, "target": data.target_lang}

@app.get("/api/history")
def get_history():
    return fake_history_db

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
