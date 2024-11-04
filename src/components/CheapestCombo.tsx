import React from 'react';
import { Plane, Star, Clock } from 'lucide-react';
import type { CheapestCombination } from '../types';
import { formatDateTime } from '../utils/flightUtils';

interface CheapestComboProps {
  combo: CheapestCombination;
}

export default function CheapestCombo({ combo }: CheapestComboProps) {
  return (
    <div className="relative overflow-hidden rounded-xl shadow-2xl">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=2000&q=80")',
          filter: 'brightness(0.3)'
        }}
      />
      
      <div className="relative bg-gradient-to-r from-indigo-500/90 to-purple-600/90 p-6 text-white backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Plane className="w-6 h-6 mr-2" /> Best Value Round Trip
          {combo.sameDayReturn && (
            <div className="ml-3 flex items-center text-yellow-300">
              <Star className="w-5 h-5 fill-current" />
              <span className="ml-1 text-sm">Same Day Return</span>
            </div>
          )}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-3 bg-white/10 rounded-lg p-4 backdrop-blur-lg">
            <div className="text-indigo-100">Outbound Flight</div>
            <div className="font-medium flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {formatDateTime(combo.outbound.departureDate)}
            </div>
            <div className="text-lg font-semibold">
              {combo.outbound.price?.currencySymbol}
              {combo.outbound.price?.value.toFixed(2)}
            </div>
          </div>
          
          <div className="space-y-3 bg-white/10 rounded-lg p-4 backdrop-blur-lg">
            <div className="text-indigo-100">Return Flight</div>
            <div className="font-medium flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {formatDateTime(combo.inbound.departureDate)}
            </div>
            <div className="text-lg font-semibold">
              {combo.inbound.price?.currencySymbol}
              {combo.inbound.price?.value.toFixed(2)}
            </div>
          </div>
          
          <div className="space-y-3 bg-white/10 rounded-lg p-4 backdrop-blur-lg">
            <div className="text-indigo-100">Total Price</div>
            <div className="text-3xl font-bold">
              {combo.outbound.price?.currencySymbol}
              {combo.totalPrice.toFixed(2)}
            </div>
            <div className="text-sm text-indigo-200">Best value combination</div>
          </div>
        </div>
      </div>
    </div>
  );
}