import {
  Apple,
  Beer,
  CakeSlice,
  CupSoda,
  LeafyGreen,
  Popcorn,
  Utensils,
} from 'lucide-react';
import type { FoodType } from '../types/schema';

type IconType = typeof Apple;

export const icons: Record<FoodType, IconType> = {
  food: Utensils,
  drink: CupSoda,
  snack: Popcorn,
  fruit: Apple,
  vegetable: LeafyGreen,
  dessert: CakeSlice,
  alcohol: Beer,
}

export const options: {
  value: FoodType;
  icon: IconType;
  label: string;
}[] = [
  {
    value: 'food' as FoodType,
    icon: icons.food,
    label: 'Food',
  },
  {
    value: 'drink' as FoodType,
    icon: icons.drink,
    label: 'Drink',
  },
  {
    value: 'snack' as FoodType,
    icon: icons.snack,
    label: 'Snack',
  },
  {
    value: 'fruit' as FoodType,
    icon: icons.fruit,
    label: 'Fruit',
  },
  {
    value: 'vegetable' as FoodType,
    icon: icons.vegetable,
    label: 'Vegetable',
  },
  {
    value: 'dessert' as FoodType,
    icon: icons.dessert,
    label: 'Dessert',
  },
  {
    value: 'alcohol' as FoodType,
    icon: icons.alcohol,
    label: 'Alcohol',
  },
].sort((a, b) =>
  a.label.localeCompare(b.label, undefined, { sensitivity: 'base' })
);