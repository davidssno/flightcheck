import React, { useState, useEffect, useRef } from 'react';
import { Plane } from 'lucide-react';
import type { Airport } from '../types';

interface AirportSearchProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  airports: Airport[];
  placeholder?: string;
}

export function AirportSearch({ label, value, onChange, airports, placeholder }: AirportSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedAirport = airports.find(airport => airport.code === value);
    setQuery(selectedAirport ? `${selectedAirport.name} (${selectedAirport.code})` : value);
  }, [value, airports]);

  useEffect(() => {
    if (!query) {
      setFilteredAirports([]);
      return;
    }

    const filtered = airports
      .filter(airport => 
        airport.name.toLowerCase().includes(query.toLowerCase()) ||
        airport.code.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5);

    setFilteredAirports(filtered);
  }, [query, airports]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (airport: Airport) => {
    onChange(airport.code);
    setQuery(`${airport.name} (${airport.code})`);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <Plane className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {isOpen && filteredAirports.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
          {filteredAirports.map((airport) => (
            <button
              key={airport.code}
              onClick={() => handleSelect(airport)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
            >
              <div className="font-medium">{airport.name}</div>
              <div className="text-sm text-gray-500">{airport.code}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}