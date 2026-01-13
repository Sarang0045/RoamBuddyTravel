from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class TripInput(BaseModel):
    place: str
    budget: float
    currency: str = "INR"
    days: int
    number_of_people: int
    start_city: Optional[str] = None
    travel_mode: Optional[str] = "Flight"
    stay_type: Optional[str] = "Hotel"
    food_pref: Optional[str] = "Any"
    activity_level: Optional[str] = "Moderate" # Relaxed, Moderate, Active
    age_group: Optional[str] = "Adult" # Kid, Teen, Adult, Senior
    preferences: List[str] = []

class TranslationInput(BaseModel):
    text: str
    source_lang: str
    target_lang: str

class LocationInput(BaseModel):
    latitude: float
    longitude: float
    radius_km: float = 5.0
