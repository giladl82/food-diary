import { z } from 'zod';

export const foodTypes = z.enum([
  'alcohol',
  'dessert',
  'drink',
  'food',
  'fruit',
  'snack',
  'vegetable',
]);

const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 1);
futureDate.setHours(0, 0, 0, 0);

export const formSchema = z.object({
  id: z.number().optional(),
  type: foodTypes,
  food: z.string().nonempty('Food is required'),
  date: z.coerce.date().max(futureDate, 'Date cannot be in the future'),
  time: z.object({
    hours: z.coerce.number().min(1, 'Hours are required'),
    minutes: z.coerce.number().min(1, 'Minutes are required'),
  }),
});

export type FormSchema = z.infer<typeof formSchema>;

export type FoodType = z.infer<typeof foodTypes>;

export type FoodEntry = {
  id?: string;
  type: FoodType;
  food: string;
  timeStamp: Date;
  date: string;
  time: {
    hours: number;
    minutes: number;
  };
};