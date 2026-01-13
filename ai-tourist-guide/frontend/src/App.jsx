import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import TripPlanner from './pages/TripPlanner';
import Nearby from './pages/Nearby';
import Translator from './pages/Translator';
import History from './pages/History';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-gray-900">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plan" element={<TripPlanner />} />
            <Route path="/nearby" element={<Nearby />} />
            <Route path="/translator" element={<Translator />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
          <p>© 2026 AI Tourist Guide. Built with React & FastAPI.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
