'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { type FoodEntry, type FormSchema } from '../types/schema';
import { Form } from './Form';
import { Button } from './ui/button';

export function EditDialog({
  onSubmit,
  onClose,
  entry,
}: {
  entry: FoodEntry | null;
  onClose: () => void;
  onSubmit: (data: FormSchema) => void;
}) {

  const onSubmitForm = (values: FormSchema) => {
    const date = new Date(values.date);
    date.setHours(values.time.hours);
    date.setMinutes(values.time.minutes);
    date.setSeconds(0);

    onSubmit({
      ...values,
      date,
    });
  };

  return (
    <div className="food-diary relative h-full">
      <Dialog open={!!entry}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Food Entry</DialogTitle>
            <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-2 right-2"
            >
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
          </DialogHeader>
          {entry && (
            <Form
              onSubmit={onSubmitForm}
              defaultValues={{
                type: entry.type,
                food: entry.food,
                date: new Date(entry.timeStamp),
                time: {
                  hours: entry.time.hours,
                  minutes: entry.time.minutes,
                },
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
