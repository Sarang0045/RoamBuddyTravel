import React, { useState } from 'react';
import { planTrip } from '../services/api';
import { Loader2, DollarSign, Users, Map as MapIcon, Shield } from 'lucide-react';
import clsx from 'clsx';

const TripPlanner = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    place: '',
    budget: '',
    days: 3,
    number_of_people: 1,
    travel_mode: 'Flight',
    activity_level: 'Moderate',
    age_group: 'Adult',
    preferences: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferenceToggle = (pref) => {
    setFormData(prev => {
      const prefs = prev.preferences.includes(pref)
        ? prev.preferences.filter(p => p !== pref)
        : [...prev.preferences, pref];
      return { ...prev, preferences: prefs };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await planTrip({
        ...formData,
        budget: parseFloat(formData.budget),
        days: parseInt(formData.days),
        number_of_people: parseInt(formData.number_of_people)
      });
      setItinerary(data);
      setStep(2);
    } catch (error) {
      alert("Failed to generate trip. Ensure backend is running.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {step === 1 && (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 border border-gray-100">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Plan Your Perfect Trip</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                <input 
                  type="text" name="place" required 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. Paris, Tokyo, Bali"
                  value={formData.place} onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget (INR)</label>
                <input 
                  type="number" name="budget" required min="100"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Total budget"
                  value={formData.budget} onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Days</label>
                <input 
                  type="number" name="days" required min="1" max="15"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.days} onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
                <input 
                  type="number" name="number_of_people" required min="1"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.number_of_people} onChange={handleInputChange}
                />
              </div>
              
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Travel Mode</label>
                <select 
                  name="travel_mode" 
                  className="w-full p-3 border rounded-lg bg-white"
                  value={formData.travel_mode} onChange={handleInputChange}
                >
                  <option>Flight</option>
                  <option>Train</option>
                  <option>Car</option>
                  <option>Bus</option>
                </select>
              </div>

               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age Group (Safety Filter)</label>
                <select 
                  name="age_group" 
                  className="w-full p-3 border rounded-lg bg-white"
                  value={formData.age_group} onChange={handleInputChange}
                >
                  <option value="Adult">Adult (Standard)</option>
                  <option value="Kid">Family with Kids (Safe)</option>
                  <option value="Teen">Teens</option>
                  <option value="Senior">Senior Citizens (Relaxed)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferences</label>
              <div className="flex flex-wrap gap-2">
                {['Nature', 'History', 'Foodie', 'Adventure', 'Shopping', 'Nightlife', 'Relaxation'].map(pref => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => handlePreferenceToggle(pref)}
                    className={clsx(
                      "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                      formData.preferences.includes(pref)
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                    )}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition flex justify-center items-center shadow-md disabled:opacity-70"
            >
              {loading ? <><Loader2 className="animate-spin mr-2" /> Generating Itinerary...</> : "Generate My Trip"}
            </button>
          </form>
        </div>
      )}

      {step === 2 && itinerary && (
        <ItineraryView itinerary={itinerary} onBack={() => setStep(1)} />
      )}
    </div>
  );
};

const ItineraryView = ({ itinerary, onBack }) => {
  const [activeDay, setActiveDay] = useState(1);
  const currentDayData = itinerary.days.find(d => d.day === activeDay);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <button onClick={onBack} className="text-indigo-600 hover:underline font-medium mb-2">← Back to Form</button>
      
      {/* Summary Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white">
          <h1 className="text-3xl font-bold">{itinerary.trip_summary.destination}</h1>
          <p className="opacity-90 mt-1">{itinerary.trip_summary.duration} • {itinerary.trip_summary.style}</p>
        </div>
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <SummaryStat icon={DollarSign} label="Total Budget" value={itinerary.trip_summary.total_budget} />
          <SummaryStat icon={Users} label="Travelers" value={itinerary.trip_summary.travelers} />
          <SummaryStat icon={MapIcon} label="Places" value={itinerary.days.flatMap(d => d.places).length} />
          <SummaryStat icon={Shield} label="Safety" value="Active" color="text-green-600" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar / Tabs */}
        <div className="md:w-1/4 flex md:flex-col overflow-x-auto gap-2 pb-2 md:pb-0">
          {itinerary.days.map(day => (
            <button
              key={day.day}
              onClick={() => setActiveDay(day.day)}
              className={clsx(
                "px-5 py-3 rounded-lg text-left font-medium transition-all min-w-[120px]",
                activeDay === day.day 
                  ? "bg-white text-indigo-600 shadow-md border-l-4 border-indigo-600" 
                  : "bg-gray-100 text-gray-500 hover:bg-white"
              )}
            >
              Day {day.day}
            </button>
          ))}
          <div className="mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm hidden md:block">
            <h4 className="font-bold text-yellow-800 mb-2">Budget</h4>
            {Object.entries(itinerary.budget_breakdown).map(([k, v]) => (
              <div key={k} className="flex justify-between mb-1">
                <span className="capitalize text-gray-600">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Day Content */}
        <div className="md:w-3/4 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">{currentDayData.title}</h2>
            
            <div className="space-y-6 relative border-l-2 border-indigo-100 ml-3 pl-8 pb-4">
              {currentDayData.schedule.map((slot, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[41px] bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                    {slot.time}
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">{slot.activity}</h4>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <MapIcon className="w-3 h-3" /> {slot.location}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <h4 className="font-bold text-gray-700 mb-2">Recommended Food</h4>
                 <ul className="list-disc pl-5 space-y-1 text-gray-600">
                   {currentDayData.food.map((f, i) => <li key={i}>{f}</li>)}
                 </ul>
               </div>
               <div>
                  <h4 className="font-bold text-gray-700 mb-2">Photo Spots</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {currentDayData.photo_spots.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
               </div>
            </div>
            
            <div className="mt-6 bg-red-50 p-4 rounded-lg text-sm text-red-700">
              <strong>Safety Tip:</strong> {currentDayData.safety[0]}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryStat = ({ icon: Icon, label, value, color = "text-indigo-600" }) => (
  <div className="bg-indigo-50 p-3 rounded-lg">
    <div className="flex items-center gap-2 mb-1">
      <Icon className={clsx("w-4 h-4", color)} />
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</span>
    </div>
    <div className="text-xl font-bold text-gray-800">{value}</div>
  </div>
);

export default TripPlanner;
