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

export function EntriesTable({ entries }: { entries: FoodEntry[] }) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto relative">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead scope="col">Date/Time</TableHead>
              <TableHead scope="col">Food</TableHead>
              <TableHead scope="col">Type</TableHead>
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
                    <div className="w-[40vw] h-fit break-words whitespace-normal">
                      {entry.food}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap flex gap-2 text-sm">
                    {Icon ? <Icon className="size-4" /> : null} {entry.type}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
