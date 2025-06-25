import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { DateInput } from '@/components/DateInput'; // Assuming DateInput is the correct import
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Download } from 'lucide-react';
import { queryEntries } from '@/utils/queryEntries';
import { exportToCSV } from '@/utils/exportToCSV';

const defaultValues = {
  from: format(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    'yyyy-MM-dd'
  ),
  to: format(new Date(), 'yyyy-MM-dd'),
};

export function ReportDialog() {
  const form = useForm({
    defaultValues,
  });

  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: { from: string; to: string }) => {
    const fromDate = new Date(data.from);
    const toDate = new Date(data.to);

    if (fromDate > toDate) {
      setError("The 'From' date cannot be greater than the 'To' date.");
      return;
    }
    const entries = (await queryEntries([fromDate, toDate]))
      .map((entry) => ({
        ...entry,
        date: format(new Date(entry.date), 'dd.MM.yyyy'),
        time: `${entry.time.hours
          .toString()
          .padStart(2, '0')}:${entry.time.minutes.toString().padStart(2, '0')}`,
      }))
      .sort((a, b) => {
        const dateComparison =
          new Date(a.date).getTime() - new Date(b.date).getTime();
        if (dateComparison !== 0) {
          return dateComparison;
        }
        return (
          parseInt(a.time.replace(':', ''), 10) -
          parseInt(b.time.replace(':', ''), 10)
        );
      });

    try {
      exportToCSV(
        entries,
        `food-diary-report${format(new Date(), 'dd.MM.yyyy')}.csv`
      );
      setError(null);
      setOpen(false);
      form.reset();
      alert('Report generated successfully! Check your downloads.');
    } catch (err) {
      setError('Failed to generate the report.');
      console.error('Error generating report:', err);
    }
  };

  return (
    <Dialog open={open} modal>
      <DialogTrigger asChild>
        <Download onClick={() => setOpen(true)} className="size-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Report</DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2"
            >
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="from"
              control={form.control}
              rules={{ required: 'From date is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <FormControl>
                    <DateInput
                      value={new Date(field.value ?? new Date())}
                      onChange={(newDate) => {
                        field.onChange(newDate);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="to"
              control={form.control}
              rules={{ required: 'To date is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <FormControl>
                    <DateInput
                      value={new Date(field.value ?? new Date())}
                      onChange={(newDate) => {
                        field.onChange(newDate);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-red-500">{error}</p>}
            <DialogFooter>
              <Button type="submit">Export to CSV</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ReportDialog;
