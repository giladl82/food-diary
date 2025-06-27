import { FoodDialog } from './FoodDialog';
import type { FormSchema } from '../types/schema';
import { useState } from 'react';
import { DateInput } from './DateInput';
import { EntriesTable } from './EntriesTable';
import ReportDialog from './ReportDialog';
import { db } from '@/utils/db';
import { useLiveQuery } from 'dexie-react-hooks';

export function FoodDiary() {
  const [date, setDate] = useState<Date>(new Date());
  const entries = useLiveQuery(() => db.foodEntries.where('date').equals(date.toDateString()).toArray(), [date]);

  const handleFoodDialogSubmit = async (data: FormSchema) => {
    await db.foodEntries.add({
      type: data.type,
      food: data.food,
      timeStamp: data.date,
      date: data.date.toDateString(),
      time: {
        hours: data.time.hours,
        minutes: data.time.minutes,
      },
    }).catch((error) => {
      console.error('Error adding food entry:', error);
    });
  };

  return (
    <div className="flex flex-col h-screen p-3 bg-gray-100">
      <header className="mb-3 z-10 flex items-center justify-between">
        <h1 className="text-xl ml-1 font-bold text-gray-800 flex items-center gap-1">
          Food Diary
          <span className="text-xs font-light">
            ({window.localStorage.getItem('userName')})
          </span>
        </h1>
        <DateInput value={date} onChange={setDate} variant="ghost" />
        <ReportDialog />
      </header>
      <div className="flex-1 overflow-y-auto p-4 mb-3 bg-white rounded-lg shadow-md">
        {entries && entries.length > 0 ? (
          <EntriesTable entries={entries} />
        ) : (
          <p></p>
        )}
      </div>
      <footer className="flex items-center justify-between mt-auto text-center text-gray-500">
        <span role="note" className="text-zinc-400 text-sm">
          © 2025 Gilad Lev-Ari
        </span>

        <FoodDialog onSubmit={handleFoodDialogSubmit} />
      </footer>
    </div>
  );
}
