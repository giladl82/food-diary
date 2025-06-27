import { options } from './options';
import type { FoodEntry } from '../types/schema';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { ActionsMenu } from './ActionsMenu';
import { useState } from 'react';
import { DeleteConfirmationDialog } from './DeleteDialog';
import { db } from '@/utils/db';
import { EditDialog } from './EditDialog';

export function EntriesTable({ entries }: { entries: FoodEntry[] }) {
  const [editId, setEditId] = useState<string | number | null>(null);
  const [deleteId, setDeleteId] = useState<string | number | null>(null);

  const deleteFoodEntry = entries.find((entry) => entry.id === deleteId);
  const editFoodEntry = entries.find((entry) => entry.id === editId);

  const handleDeleteEntry = async () => {
    if (!deleteFoodEntry?.id) return;
    await db.foodEntries.delete(deleteFoodEntry.id);
    setDeleteId(null);
  };

  const handleUpdateEntry = async (data: FoodEntry) => {
    console.log('Submitting edit:', data);
    if (!editFoodEntry?.id) return;
    await db.foodEntries.update(editFoodEntry.id, {
      type: data.type,
      food: data.food,
      timeStamp: new Date(data.date),
      date: new Date(data.date).toDateString(),
      time: {
        hours: data.time.hours,
        minutes: data.time.minutes,
      },
    });

    setEditId(null);
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto relative">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead scope="col">Time</TableHead>
              <TableHead scope="col">Food</TableHead>
              <TableHead scope="col">Type</TableHead>
              <TableHead scope="col">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {/* Rows will be populated here */}
            {entries.map((entry, index) => {
              const Icon =
                options.find((op) => {
                  return op.value === entry.type;
                })?.icon || null;
              return (
                <TableRow key={index}>
                  <TableCell className="whitespace-nowrap text-sm">
                    {entry.time.hours.toString().padStart(2, '0')}:
                    {entry.time.minutes.toString().padStart(2, '0')}
                  </TableCell>
                  <TableCell className="text-sm">
                    <div className="w-[32.5vw] h-fit break-words whitespace-normal">
                      {entry.food}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap flex gap-2 text-sm">
                    {Icon ? <Icon className="size-4" /> : null}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm">
                    <ActionsMenu
                      onEdit={() => setEditId(entry.id ?? null)}
                      onDelete={() => setDeleteId(entry.id ?? null)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <EditDialog
          onClose={() => setEditId(null)}
          onSubmit={handleUpdateEntry}
          entry={editFoodEntry ?? null}
        />

        <DeleteConfirmationDialog
          entry={deleteFoodEntry}
          onCancel={() => setDeleteId(null)}
          onConfirm={handleDeleteEntry}
        />
      </div>
    </div>
  );
}
