import React, { useState } from 'react';
import { SearchForm } from './components/SearchForm';
import FlightResults from './components/FlightResults';
import DownloadPage from './components/DownloadPage';
import { searchFlights } from './api/flights';
import type { FlightData } from './types';
import { Download } from 'lucide-react';

function App() {
  const [flightData, setFlightData] = useState<FlightData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  const handleSearch = async (from: string, to: string, date: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchFlights(from, to, date);
      setFlightData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching flights');
      setFlightData(null);
    } finally {
      setLoading(false);
    }
  };

  if (showDownload) {
    return <DownloadPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white">
      {/* Download Button */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => setShowDownload(true)}
          className="flex items-center px-4 py-2 bg-white/90 hover:bg-white rounded-full shadow-lg text-gray-700 hover:text-gray-900 transition-all duration-200"
        >
          <Download className="w-4 h-4 mr-2" />
          <span>Download Project</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80")',
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative max-w-4xl mx-auto pt-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Perfect Flight
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Search through thousands of destinations worldwide
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 mb-12">
        <SearchForm onSearch={handleSearch} />

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading flights...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {flightData && <FlightResults data={flightData} />}
      </div>

      {/* Featured Destinations */}
      {!flightData && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative rounded-lg overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1558628728-df981796eb1f?auto=format&fit=crop&w=800&q=80" 
                alt="Barcelona"
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-xl font-bold text-white">Barcelona</h3>
                <p className="text-gray-200">Spain</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?auto=format&fit=crop&w=800&q=80" 
                alt="London"
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-xl font-bold text-white">London</h3>
                <p className="text-gray-200">United Kingdom</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=800&q=80" 
                alt="Rome"
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-xl font-bold text-white">Rome</h3>
                <p className="text-gray-200">Italy</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;