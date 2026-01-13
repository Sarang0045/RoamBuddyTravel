import React, { useEffect, useState } from 'react';
import { getHistory } from '../services/api';
import { Calendar } from 'lucide-react';

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        getHistory().then(setHistory).catch(console.error);
    }, []);

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Your Journey History</h2>
            
            {history.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-400 text-lg">No saved trips yet. Start planning!</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {history.map((item, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">{item.place}</h3>
                                <p className="text-gray-500 flex items-center gap-2 mt-1">
                                    <Calendar className="w-4 h-4" /> {item.days} Days • {item.summary.style}
                                </p>
                            </div>
                            <div className="text-right">
                                <span className="block text-2xl font-bold text-indigo-600">₹{item.budget}</span>
                                <span className="text-xs text-gray-400">Total Budget</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
