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

export interface FlightDirection {
  fares: FlightFare[];
  minFare: FlightFare;
  maxFare: FlightFare;
}

export interface FlightData {
  outbound: FlightDirection;
  inbound: FlightDirection;
}