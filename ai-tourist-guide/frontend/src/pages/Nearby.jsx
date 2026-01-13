import React, { useState, useEffect } from 'react';
import { getNearbyPlaces } from '../services/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Loader2, Navigation, MapPin } from 'lucide-react';

// Fix for default Leaflet marker icons in React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Nearby = () => {
    const [location, setLocation] = useState(null);
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGetLocation = () => {
        setLoading(true);
        setError(null);
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ lat: latitude, lng: longitude });
                
                try {
                    const data = await getNearbyPlaces(latitude, longitude);
                    setPlaces(data.places);
                } catch (err) {
                    setError("Failed to fetch nearby places.");
                } finally {
                    setLoading(false);
                }
            },
            () => {
                setError("Unable to retrieve your location");
                setLoading(false);
            }
        );
    };

    // Default view for map (London) if no location
    const defaultCenter = [51.505, -0.09];

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col md:flex-row gap-4">
            {/* Sidebar List */}
            <div className="md:w-1/3 flex flex-col h-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-4 border-b bg-gray-50">
                    <h2 className="text-xl font-bold mb-2">Nearby Gems</h2>
                    <button 
                        onClick={handleGetLocation}
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
                    >
                        {loading ? <Loader2 className="animate-spin w-4 h-4"/> : <Navigation className="w-4 h-4"/>}
                        {location ? "Refresh Location" : "Find Near Me"}
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
                
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                    {places.length === 0 && !loading && (
                        <div className="text-center text-gray-400 mt-10">
                            <MapPin className="w-10 h-10 mx-auto mb-2 opacity-50"/>
                            <p>Click "Find Near Me" to see attractions.</p>
                        </div>
                    )}
                    {places.map((place, idx) => (
                        <div key={idx} className="p-4 bg-white border border-gray-100 hover:border-indigo-300 rounded-lg shadow-sm transition group cursor-pointer">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-800">{place.name}</h3>
                                <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">{place.type}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{place.distance} away • ⭐ {place.rating}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Map Area */}
            <div className="md:w-2/3 h-full rounded-xl overflow-hidden shadow-lg border border-gray-200 relative z-0">
                <MapContainer 
                    center={location ? [location.lat, location.lng] : defaultCenter} 
                    zoom={location ? 14 : 13} 
                    scrollWheelZoom={true}
                    key={location ? `${location.lat}-${location.lng}` : 'default'} // Force re-render on loc change
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {location && (
                         <Marker position={[location.lat, location.lng]}>
                            <Popup>You are here</Popup>
                        </Marker>
                    )}

                    {places.map((place, idx) => (
                        <Marker key={idx} position={[place.lat, place.lng]}>
                            <Popup>
                                <strong>{place.name}</strong><br/>
                                {place.type}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default Nearby;
