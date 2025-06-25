'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { formSchema, type FoodEntry } from './schema';
import { DateInput } from './DateInput';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { options } from './options';

export function FoodDialog({
  onSubmit,
}: {
  onSubmit: (data: FoodEntry) => void;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<FoodEntry>({
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

  const onSubmitForm = (values: FoodEntry) => {
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

          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmitForm)}
            >
              {/* Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of food</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <option.icon /> {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="h-4">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Descritption */}
              <FormField
                control={form.control}
                name="food"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                        onFocus={(e) => e.target.select()}
                      />
                    </FormControl>
                    <div className="h-4">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <DateInput
                        value={new Date(field.value ?? new Date())}
                        onChange={(newDate) => {
                          field.onChange(newDate);
                        }}
                      />
                    </FormControl>
                    <div className="h-4">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Time */}
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          max="23"
                          value={field.value.hours}
                          onChange={(e) =>
                            field.onChange({
                              ...field.value,
                              hours: e.target.value,
                            })
                          }
                          onFocus={(e) => e.target.select()}
                          className="w-16 text-center"
                        />
                        <span>:</span>
                        <Input
                          type="number"
                          min="0"
                          max="59"
                          step="1"
                          value={field.value.minutes}
                          onChange={(e) =>
                            field.onChange({
                              ...field.value,
                              minutes: e.target.value,
                            })
                          }
                          onFocus={(e) => e.target.select()}
                          className="w-16 text-center"
                        />
                      </div>
                    </FormControl>
                    <div className="h-4">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit" disabled={!form.formState.isValid}>
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
