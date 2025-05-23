import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';

const DeleteSpeaker = ({ id, trigger, open, setOpen }) => {
  const { delete: destroy } = useForm();

  const handleDelete = () => {
    destroy(route('participants.destroy', id));
    setOpen(false); // close dialog after delete
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the account.
          </DialogDescription>
        </DialogHeader>
        <Button
          onClick={handleDelete}
          className="cursor-pointer rounded bg-red-500 px-3 py-2 text-white"
        >
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSpeaker;
