import type { FoodEntry } from '@/types/schema';
import Dexie, {type Table } from 'dexie';

class FoodDB extends Dexie {
  foodEntries!: Table<FoodEntry, string>;

  constructor() {
    super('food-db');

    this.version(4).stores({
      foodEntries: '++id, type, date, timeStamp' // 'id' is primary key, name and date are indexed
    });
  }
}

export const db = new FoodDB();