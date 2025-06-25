import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

export function DateInput({
  value,
  onChange,
  variant = 'outline',
}: {
  value: Date | undefined;
  onChange: (date: Date) => void;
  variant?: 'default' | 'ghost'  | 'outline';
}) {
  const handleDateChange = (date: Date | undefined) => {
    if (date && !isNaN(date.getTime())) {
      onChange(date);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={variant} className="justify-between">
          {value ? format(value, 'PPP') : 'Select date'} <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-auto">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleDateChange}
          weekStartsOn={0} // Sunday
          disabled={(d) => d > new Date()} // Disable future dates
          className='shadow-lg rounded-lg'
        />
      </PopoverContent>
    </Popover>
  );
}
