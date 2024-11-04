import React from 'react';
import { Calendar, Clock, ArrowRight, ArrowLeft, ExternalLink, Star } from 'lucide-react';
import type { FlightData, FlightFare } from '../types';
import { formatDateTime, formatPrice, findCheapestCombination, isSameDayReturn } from '../utils/flightUtils';
import CheapestCombo from './CheapestCombo';

interface FlightResultsProps {
  data: FlightData;
}

export default function FlightResults({ data }: FlightResultsProps) {
  const cheapestCombo = findCheapestCombination(data);
  const combinedFlights = [
    ...data.outbound.fares.map(fare => ({ ...fare, direction: 'outbound' as const })),
    ...data.inbound.fares.map(fare => ({ ...fare, direction: 'inbound' as const }))
  ].sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());

  const getFlightUrl = (flight: FlightFare & { direction: 'outbound' | 'inbound' }) => {
    const [from, to] = flight.direction === 'outbound' 
      ? [data.outbound.fares[0]?.departureAirport, data.outbound.fares[0]?.arrivalAirport]
      : [data.inbound.fares[0]?.departureAirport, data.inbound.fares[0]?.arrivalAirport];
    
    if (!flight.departureDate) return '#';
    const date = new Date(flight.departureDate);
    const formattedDate = date.toISOString().split('T')[0];
    return `https://www.ryanair.com/gb/en/trip/flights/select?adults=1&dateOut=${formattedDate}&origin=${from}&destination=${to}`;
  };

  return (
    <div className="space-y-8">
      {cheapestCombo && <CheapestCombo combo={cheapestCombo} />}

      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Direction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {combinedFlights.map((flight, index) => {
                const hasSameDayReturn = flight.direction === 'outbound' && 
                  data.inbound.fares.some(inbound => isSameDayReturn(flight, inbound));

                return (
                  <tr
                    key={`${flight.direction}-${flight.day}-${index}`}
                    className={`hover:bg-gray-50 ${flight.unavailable ? 'bg-gray-50' : ''}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {flight.direction === 'outbound' ? (
                          <>
                            <ArrowRight className="w-4 h-4 text-indigo-500 mr-2" />
                            <span className="text-indigo-600 font-medium">Outbound</span>
                            {hasSameDayReturn && (
                              <Star className="w-4 h-4 ml-2 text-yellow-400 fill-current" />
                            )}
                          </>
                        ) : (
                          <>
                            <ArrowLeft className="w-4 h-4 text-emerald-500 mr-2" />
                            <span className="text-emerald-600 font-medium">Inbound</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-900">
                          {new Date(flight.day).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-900">
                          {formatDateTime(flight.departureDate)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {!flight.unavailable && !flight.soldOut && (
                        <a
                          href={getFlightUrl(flight)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center hover:text-indigo-600 transition-colors"
                        >
                          <span className="text-lg font-semibold">
                            {formatPrice(flight)}
                          </span>
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {flight.unavailable ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Unavailable
                        </span>
                      ) : flight.soldOut ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Sold Out
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Available
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}