
import { openDB } from 'idb';

  export async function getDb() {
    return openDB('food-diary', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('entries')) {
          db.createObjectStore('entries', {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
      },
    });
  }

export async function queryEntries(date: Date | [Date, Date]) {
  const db = await getDb();
  return (await db.getAll('entries')).filter((entry) => {
    if (Array.isArray(date)) {
      return entry.date >= date[0] && entry.date <= date[1];
    }
    
    return entry.date.toDateString() === date.toDateString();
  });
}
