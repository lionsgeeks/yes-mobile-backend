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
import { Trash2 } from 'lucide-react';

const DeleteSpeaker = ({ speaker }) => {
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        destroy(route('participants.destroy', speaker.id));
    };

    return (
        <Dialog >
                <DialogTrigger className=" cursor-pointer">
                <Trash2 size={20} color='#ff0000' />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>This action cannot be undone. This will permanently delete the speaker account.</DialogDescription>
                    </DialogHeader>
                    <Button onClick={handleDelete} className="cursor-pointer rounded bg-red-500 px-3 py-2 text-white">
                    Delete
                    </Button>
                </DialogContent>
            </Dialog>
    );
};

export default DeleteSpeaker;
