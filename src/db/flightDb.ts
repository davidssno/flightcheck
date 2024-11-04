import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface FlightDBSchema extends DBSchema {
  searches: {
    key: string;
    value: {
      id: string;
      fromAirport: string;
      toAirport: string;
      date: string;
      savedAt: number;
      flightData: any;
    };
    indexes: { 'by-date': number };
  };
}

let dbPromise: Promise<IDBPDatabase<FlightDBSchema>>;

export async function initDB() {
  dbPromise = openDB<FlightDBSchema>('flightSearches', 1, {
    upgrade(db) {
      const store = db.createObjectStore('searches', {
        keyPath: 'id'
      });
      store.createIndex('by-date', 'savedAt');
    },
  });
  return dbPromise;
}

export async function saveSearch(fromAirport: string, toAirport: string, date: string, flightData: any) {
  const db = await dbPromise;
  const id = `${fromAirport}-${toAirport}-${date}-${Date.now()}`;
  await db.put('searches', {
    id,
    fromAirport,
    toAirport,
    date,
    savedAt: Date.now(),
    flightData
  });
  return id;
}

export async function getSearches() {
  const db = await dbPromise;
  return db.getAllFromIndex('searches', 'by-date');
}

export async function deleteSearch(id: string) {
  const db = await dbPromise;
  await db.delete('searches', id);
}