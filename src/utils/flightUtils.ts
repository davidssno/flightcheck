import type { FlightData, FlightFare, CheapestCombination } from '../types';

export function formatDateTime(dateStr: string | null): string {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return date.toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

export function formatPrice(fare: FlightFare): string {
  if (!fare?.price) return 'N/A';
  return `${fare.price.currencySymbol}${fare.price.value.toFixed(2)}`;
}

export function isValidReturnFlight(outbound: FlightFare, inbound: FlightFare): boolean {
  if (!outbound.departureDate || !inbound.departureDate) return false;
  
  const outboundDate = new Date(outbound.departureDate);
  const inboundDate = new Date(inbound.departureDate);
  const timeDiff = inboundDate.getTime() - outboundDate.getTime();
  const hoursDiff = timeDiff / (1000 * 60 * 60);
  
  return hoursDiff >= 5;
}

export function isSameDayReturn(outbound: FlightFare, inbound: FlightFare): boolean {
  if (!outbound.departureDate || !inbound.departureDate) return false;
  
  const outboundDate = new Date(outbound.departureDate);
  const inboundDate = new Date(inbound.departureDate);
  const timeDiff = inboundDate.getTime() - outboundDate.getTime();
  const hoursDiff = timeDiff / (1000 * 60 * 60);
  
  return outboundDate.toDateString() === inboundDate.toDateString() && hoursDiff >= 5;
}

export function findCheapestCombination(data: FlightData): CheapestCombination | null {
  let cheapestCombo: CheapestCombination | null = null;
  let lowestTotal = Infinity;

  data.outbound.fares.forEach(outbound => {
    if (outbound.unavailable || outbound.soldOut || !outbound.price) return;
    
    data.inbound.fares.forEach(inbound => {
      if (inbound.unavailable || inbound.soldOut || !inbound.price) return;
      
      if (isValidReturnFlight(outbound, inbound)) {
        const totalPrice = outbound.price.value + inbound.price.value;
        if (totalPrice < lowestTotal) {
          lowestTotal = totalPrice;
          cheapestCombo = {
            outbound,
            inbound,
            totalPrice,
            sameDayReturn: isSameDayReturn(outbound, inbound)
          };
        }
      }
    });
  });

  return cheapestCombo;
}

export function getBookingUrl(flight: FlightFare, fromAirport: string, toAirport: string): string {
  if (!flight.departureDate) return '#';
  const date = new Date(flight.departureDate);
  const formattedDate = date.toISOString().split('T')[0];
  return `https://www.ryanair.com/gb/en/trip/flights/select?adults=1&teens=0&children=0&infants=0&dateOut=${formattedDate}&dateIn=&isConnectedFlight=false&isReturn=false&discount=0&promoCode=&originIata=${fromAirport}&destinationIata=${toAirport}&tpAdults=1&tpTeens=0&tpChildren=0&tpInfants=0&tpStartDate=${formattedDate}&tpEndDate=&tpDiscount=0&tpPromoCode=&tpOriginIata=${fromAirport}&tpDestinationIata=${toAirport}`;
}