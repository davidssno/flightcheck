export interface Price {
  value: number;
  valueMainUnit: string;
  valueFractionalUnit: string;
  currencyCode: string;
  currencySymbol: string;
}

export interface FlightFare {
  day: string;
  arrivalDate: string | null;
  departureDate: string | null;
  price: Price | null;
  soldOut: boolean;
  unavailable: boolean;
}

export interface FlightData {
  outbound: {
    fares: FlightFare[];
    minFare: FlightFare;
    maxFare: FlightFare;
  };
  inbound: {
    fares: FlightFare[];
    minFare: FlightFare;
    maxFare: FlightFare;
  };
}

export interface CombinedFlight extends FlightFare {
  direction: 'outbound' | 'inbound';
}

export interface CheapestCombination {
  outbound: FlightFare;
  inbound: FlightFare;
  totalPrice: number;
  sameDayReturn: boolean;
}

export interface Airport {
  code: string;
  name: string;
  seoName: string;
  aliases: string[];
  base: boolean;
  city: {
    code: string;
    name: string;
  };
  region: {
    code: string;
    name: string;
  };
  country: {
    code: string;
    name: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
}