export async function fetchAirports(): Promise<Airport[]> {
  try {
    const response = await fetch('https://www.ryanair.com/api/views/locate/5/airports/en/active');
    if (!response.ok) {
      throw new Error('Failed to fetch airports');
    }
    const airports = await response.json();
    return airports;
  } catch (error) {
    console.error('Error fetching airports:', error);
    return [];
  }
}