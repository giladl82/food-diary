'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { formSchema, type FormSchema } from '../types/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from './Form';

export function NewDialog({
  onSubmit,
}: {
  onSubmit: (data: FormSchema) => void;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true,
    defaultValues: {
      type: 'food',
      food: '',
      date: new Date(),
      time: {
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
      },
    },
  });

  const onSubmitForm = (values: FormSchema) => {
    const date = new Date(values.date);
    date.setHours(values.time.hours);
    date.setMinutes(values.time.minutes);
    date.setSeconds(0);

    onSubmit({
      ...values,
      date,
    });
    setOpen(false);
  };

  useEffect(() => {
    // Reset form when dialog opens
    if (open) {
      form.reset({
        type: 'food',
        food: '',
        date: new Date(),
        time: {
          hours: new Date().getHours(),
          minutes: new Date().getMinutes(),
        },
      });
    }
  }, [form, open]);

  return (
    <div className="food-diary relative h-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            color="primary"
            className="rounded-full w-14 h-14 shadow-lg flex items-center justify-center"
            aria-label="Add new entry"
          >
            <Plus className="size-7" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Food Entry</DialogTitle>
          </DialogHeader>
          <Form
            onSubmit={onSubmitForm}
            defaultValues={{
              type: 'food',
              food: '',
              date: new Date(),
              time: {
                hours: new Date().getHours(),
                minutes: new Date().getMinutes(),
              },
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
