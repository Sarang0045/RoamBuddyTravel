import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Map, Globe, ShieldCheck } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-10 py-10">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-6">
          Your Smart Travel Companion
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Plan trips, find nearby gems, and break language barriers with AI-powered tools tailored just for you.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/plan" className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition transform hover:scale-105 shadow-lg">
            Start Planning
          </Link>
          <Link to="/nearby" className="px-8 py-3 bg-white text-indigo-600 border border-indigo-200 rounded-full font-bold hover:shadow-md transition">
            Explore Nearby
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl px-4">
        <FeatureCard 
          icon={Plane} 
          title="AI Trip Planner" 
          desc="Custom itineraries based on your budget, style, and companions."
          link="/plan"
        />
        <FeatureCard 
          icon={Map} 
          title="Nearby Discovery" 
          desc="Instantly find attractions, cafes, and spots around you."
          link="/nearby"
        />
        <FeatureCard 
          icon={Globe} 
          title="Translator Bot" 
          desc="Communicate effortlessly in local languages."
          link="/translator"
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, link }) => (
  <Link to={link} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group">
    <div className="bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
      <Icon className="text-indigo-600 w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500">{desc}</p>
  </Link>
);

export default Home;
