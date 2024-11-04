import React from 'react';
import { Calendar, Trash2 } from 'lucide-react';
import { deleteSearch } from '../db/flightDb';

interface SavedSearchesProps {
  searches: any[];
  onDelete: (id: string) => void;
  onSelect: (search: any) => void;
}

export function SavedSearches({ searches, onDelete, onSelect }: SavedSearchesProps) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Recent Searches</h2>
      <div className="space-y-3">
        {searches.map((search) => (
          <div
            key={search.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <button
              onClick={() => onSelect(search)}
              className="flex-1 flex items-center text-left"
            >
              <div className="flex-1">
                <div className="font-medium">
                  {search.fromAirport} → {search.toAirport}
                </div>
                <div className="text-sm text-gray-500 flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(search.date).toLocaleDateString()}
                </div>
              </div>
            </button>
            <button
              onClick={() => onDelete(search.id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Delete search"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}