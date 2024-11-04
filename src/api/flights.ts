export async function searchFlights(from: string, to: string, date: string): Promise<any> {
  const [outboundResponse, inboundResponse] = await Promise.all([
    fetch(
      `https://www.ryanair.com/api/farfnd/v4/oneWayFares/${from}/${to}/cheapestPerDay?outboundMonthOfDate=${date}&currency=GBP`
    ),
    fetch(
      `https://www.ryanair.com/api/farfnd/v4/oneWayFares/${to}/${from}/cheapestPerDay?outboundMonthOfDate=${date}&currency=GBP`
    )
  ]);
  
  if (!outboundResponse.ok || !inboundResponse.ok) {
    throw new Error('Failed to fetch flight data');
  }
  
  const [outboundData, inboundData] = await Promise.all([
    outboundResponse.json(),
    inboundResponse.json()
  ]);

  return {
    outbound: outboundData.outbound,
    inbound: inboundData.outbound
  };
}