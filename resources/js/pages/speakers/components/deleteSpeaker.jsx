import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';

const DeleteSpeaker = ({ speaker, trigger }) => {
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        destroy(route('participants.destroy', speaker.id));
    };

    return (
        <Dialog >
            <DialogTrigger className=" cursor-pointer">
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>This action cannot be undone. This will permanently delete the account.</DialogDescription>
                </DialogHeader>
                <DialogClose>
                    <Button onClick={handleDelete} className="cursor-pointer rounded bg-red-500 px-3 py-2 text-white">
                        Delete
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteSpeaker;
