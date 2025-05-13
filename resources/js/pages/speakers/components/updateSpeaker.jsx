import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const UpdateSpeaker = ({ speaker }) => {
    return (
        <div>
            <Dialog >
                <DialogTrigger className="">Edit</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>This action cannot be undone. This will permanently delete the speaker account.</DialogDescription>
                    </DialogHeader>
                    {/* <Button onClick={handleDelete} className="cursor-pointer rounded bg-red-500 px-3 py-2 text-white">
                    Delete
                    </Button> */}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UpdateSpeaker;
