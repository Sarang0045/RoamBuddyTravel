import random
from typing import Dict, Any
from .models import TripInput

def generate_mock_itinerary(data: TripInput) -> Dict[str, Any]:
    """
    Generates a rich mock itinerary based on input without calling OpenAI.
    """
    
    # Simulate simple logic tailored to inputs
    budget_per_person = data.budget / data.number_of_people
    
    # Heuristics for INR
    budget_level = "Luxury" if budget_per_person > 40000 else "Budget" if budget_per_person < 10000 else "Standard"
    
    place_name = data.place.title()
    
    # Filter content based on age group (Safe Search logic)
    safe_for_kids = data.age_group in ["Kid", "Teen"]
    nightlife_activity = "Night Club Hopping" if not safe_for_kids else "Evening Light Show"
    
    trip_summary = {
        "destination": place_name,
        "duration": f"{data.days} Days",
        "travelers": data.number_of_people,
        "style": f"{data.activity_level}, {budget_level}",
        "total_budget": f"{data.currency} {data.budget}",
        "notes": "Weather is expected to be sunny. Pack light cotton clothes."
    }
    
    budget_breakdown = {
        "accommodation": f"{data.currency} {data.budget * 0.4:.2f}",
        "food": f"{data.currency} {data.budget * 0.2:.2f}",
        "activities": f"{data.currency} {data.budget * 0.2:.2f}",
        "travel": f"{data.currency} {data.budget * 0.1:.2f}",
        "misc": f"{data.currency} {data.budget * 0.1:.2f}"
    }

    days = []
    
    # Generic activities to mix and match
    activities_pool = [
        {"time": "09:00", "activity": f"Visit the famous {place_name} Museum", "location": "City Center"},
        {"time": "11:00", "activity": "Walking tour of the Old Town", "location": "Old Town"},
        {"time": "13:00", "activity": "Lunch at a local delicacy spot", "location": "Downtown"},
        {"time": "15:00", "activity": "Shopping at the Grand Bazaar" if not safe_for_kids else "Visit the Zoo/Aquarium", "location": "Market District"},
        {"time": "17:00", "activity": "Sunset view from the Hilltop", "location": "Hilltop Park"},
        {"time": "20:00", "activity": "Dinner with live music", "location": "Harbor View"},
        {"time": "22:00", "activity": nightlife_activity, "location": "City Center"}
    ]

    for i in range(1, data.days + 1):
        # Shuffle activities for variety
        daily_schedule = random.sample(activities_pool, k=min(len(activities_pool), 5))
        # Sort roughly by time (strings work roughly for 09, 11, 13 etc)
        daily_schedule.sort(key=lambda x: x["time"])
        
        days.append({
            "day": i,
            "title": f"Day {i}: Exploring {place_name}",
            "schedule": daily_schedule,
            "places": ["City Museum", "Old Town", "Hilltop Park"],
            "food": ["Local Bistro", "Street Food Market"],
            "photo_spots": ["The Big Arch", "Sunset Point"],
            "safety": ["Watch out for pickpockets in crowded areas", "Drink bottled water"]
        })

    hotel_options = [
        {"name": "Grand Hotel", "rating": 4.5, "price_per_night": f"{data.currency} 12,000", "location": "City Center"},
        {"name": "Cozy Hostel", "rating": 4.0, "price_per_night": f"{data.currency} 2,500", "location": "Old Town"},
        {"name": "Sunrise Apartment", "rating": 4.8, "price_per_night": f"{data.currency} 6,000", "location": "Beachfront"}
    ]

    emergency = {
        "police": "911 or Local 100",
        "ambulance": "911 or Local 102",
        "embassy_contact": "+1-800-555-0199"
    }

    return {
        "trip_summary": trip_summary,
        "budget_breakdown": budget_breakdown,
        "days": days,
        "hotel_options": hotel_options,
        "emergency": emergency
    }

def get_nearby_places_mock(lat: float, lon: float) -> List[Dict[str, Any]]:
    # Mock nearby places simulation
    return [
        {"name": "Central Park", "type": "Park", "distance": "0.5 km", "rating": 4.8, "lat": lat + 0.002, "lng": lon + 0.002},
        {"name": "Joe's Coffee", "type": "Cafe", "distance": "0.2 km", "rating": 4.5, "lat": lat - 0.001, "lng": lon + 0.001},
        {"name": "City Mall", "type": "Shopping", "distance": "1.2 km", "rating": 4.2, "lat": lat + 0.005, "lng": lon - 0.002},
        {"name": "History Museum", "type": "Attraction", "distance": "0.8 km", "rating": 4.7, "lat": lat - 0.003, "lng": lon - 0.003},
    ]
