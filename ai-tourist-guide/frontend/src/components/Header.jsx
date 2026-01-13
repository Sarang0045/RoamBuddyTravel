import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Calendar, Globe, History, BrainCircuit } from 'lucide-react';
import clsx from 'clsx';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: BrainCircuit },
    { name: 'Trip Planner', path: '/plan', icon: Calendar },
    { name: 'Nearby', path: '/nearby', icon: MapPin },
    { name: 'Translator', path: '/translator', icon: Globe },
    { name: 'History', path: '/history', icon: History },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
          <span>Roam Buddy</span>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={clsx(
                "flex items-center gap-1 font-medium transition-colors hover:text-indigo-600",
                location.pathname === item.path ? "text-indigo-600" : "text-gray-600"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
