import type { FoodEntry } from '@/types/schema';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
type DeleteDialogProps = {
  entry?: FoodEntry | null;
  onConfirm: (entryId: string | number) => void;
  onCancel: () => void;
};

export function DeleteConfirmationDialog({
  entry,
  onConfirm,
  onCancel,
}: DeleteDialogProps) {
  return (
    <Dialog
      open={!!entry}
      onOpenChange={(open: boolean) => !open && onCancel()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Entry</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{entry?.food}</strong>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => onConfirm(entry?.id ?? '')}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
