import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
const DeletePrograme = ({ id }) => {
    const { delete: destroy } = useForm();
     const [open, setOpen] = useState(false);
    const handleDelete = () => {
        destroy(route('programe.destroy', id));
        setOpen(false);
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="cursor-pointer">
            <Trash2 size={20} color='#ff0000' />
            </DialogTrigger>
            <DialogContent className="max-w-[80%] sm:max-w-[425px]">
                <DialogHeader className="text-center">
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>This action cannot be undone. This will permanently delete the programe.</DialogDescription>
                </DialogHeader>
                <Button onClick={handleDelete} className="cursor-pointer rounded bg-red-500 px-3 py-2 text-white">
                    Delete
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default DeletePrograme;
