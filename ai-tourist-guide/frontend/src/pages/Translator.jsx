import React, { useState } from 'react';
import { translateText } from '../services/api';
import { ArrowRightLeft, Copy, Check } from 'lucide-react';

const Translator = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [source, setSource] = useState('en');
  const [target, setTarget] = useState('es');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ja', name: 'Japanese' },
  ];

  const handleTranslate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const data = await translateText(text, source, target);
      setResult(data.translated);
    } catch (error) {
      console.error(error);
      setResult("Error translating text.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center">
          <h2 className="text-3xl font-bold">AI Translator</h2>
          <p className="opacity-80">Break language barriers instantly</p>
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <select 
              value={source} onChange={(e) => setSource(e.target.value)}
              className="flex-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
            </select>
            
            <ArrowRightLeft className="text-gray-400" />
            
            <select 
              value={target} onChange={(e) => setTarget(e.target.value)}
              className="flex-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-500 mb-2">Original Text</label>
              <textarea
                className="w-full h-40 p-4 border rounded-xl bg-gray-50 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Type something here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="flex flex-col relative">
              <label className="text-sm font-medium text-gray-500 mb-2">Translation</label>
              <div className="w-full h-40 p-4 border rounded-xl bg-indigo-50 text-indigo-900 overflow-y-auto">
                {loading ? <span className="animate-pulse">Translating...</span> : result || <span className="text-gray-400 italic">Translation will appear here</span>}
              </div>
              {result && (
                <button 
                  onClick={copyToClipboard}
                  className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md text-gray-500 hover:text-indigo-600"
                  title="Copy"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500"/> : <Copy className="w-4 h-4"/>}
                </button>
              )}
            </div>
          </div>

          <button
            onClick={handleTranslate}
            disabled={loading || !text}
            className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            Translate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Translator;
