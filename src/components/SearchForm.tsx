import React, { useState, useEffect } from 'react';
import { Calendar, PlaneTakeoff, PlaneLanding } from 'lucide-react';
import { AirportSearch } from './AirportSearch';
import { fetchAirports } from '../api/airports';
import type { Airport } from '../types';

interface SearchFormProps {
  onSearch: (from: string, to: string, date: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [fromAirport, setFromAirport] = useState('');
  const [toAirport, setToAirport] = useState('');
  const [date, setDate] = useState('');
  const [airports, setAirports] = useState<Airport[]>([]);

  useEffect(() => {
    const loadAirports = async () => {
      const data = await fetchAirports();
      setAirports(data);
    };
    loadAirports();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromAirport && toAirport && date) {
      onSearch(fromAirport.toUpperCase(), toAirport.toUpperCase(), date);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl p-6 mb-8 backdrop-blur-lg bg-white/90">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative">
          <div className="absolute -top-3 left-4 px-2 bg-white">
            <PlaneTakeoff className="w-4 h-4 text-indigo-600 inline-block mr-1" />
            <span className="text-xs font-medium text-indigo-600">Departure</span>
          </div>
          <AirportSearch
            label=""
            value={fromAirport}
            onChange={setFromAirport}
            airports={airports}
            placeholder="From where?"
          />
        </div>

        <div className="relative">
          <div className="absolute -top-3 left-4 px-2 bg-white">
            <PlaneLanding className="w-4 h-4 text-indigo-600 inline-block mr-1" />
            <span className="text-xs font-medium text-indigo-600">Arrival</span>
          </div>
          <AirportSearch
            label=""
            value={toAirport}
            onChange={setToAirport}
            airports={airports}
            placeholder="To where?"
          />
        </div>

        <div className="relative">
          <div className="absolute -top-3 left-4 px-2 bg-white">
            <Calendar className="w-4 h-4 text-indigo-600 inline-block mr-1" />
            <span className="text-xs font-medium text-indigo-600">Travel Date</span>
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl"
      >
        Search Flights
      </button>
    </form>
  );
}