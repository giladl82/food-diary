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

export const formSchema = z.object({
  type: foodTypes,
  food: z.string().nonempty().min(3, 'Food is required'),
  date: z.coerce.date().max(futureDate, 'Date cannot be in the future'),
  time: z.object({
    hours: z.coerce.number().min(1, 'Hours are required'),
    minutes: z.coerce.number().min(1, 'Minutes are required'),
  }),
});

export type FoodEntry = z.infer<typeof formSchema>;

export type FoodType = z.infer<typeof foodTypes>;