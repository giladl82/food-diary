import { FoodDialog } from './FoodDialog';
import type { FoodEntry } from './schema';
import { useEffect, useState } from 'react';
import { DateInput } from './DateInput';
import { EntriesTable } from './EntriesTable';
import ReportDialog from './ReportDialog';
import { getDb, queryEntries } from '@/utils/queryEntries';

export function FoodDiary() {
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [date, setDate] = useState<Date>(new Date());


  const handleFoodDialogSubmit = async (data: { food: string; date: Date }) => {
    const db = await getDb();
    await db.add('entries', { ...data });
    setEntries((prev) => [...prev, data as FoodEntry]);
  };

  useEffect(() => {
    async function fetchEntries() {
      const allEntries = await queryEntries(date);
      setEntries(allEntries || []);
    }
    fetchEntries();
  }, [date]);

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
        {entries.length > 0 ? <EntriesTable entries={entries} /> : <p></p>}
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
