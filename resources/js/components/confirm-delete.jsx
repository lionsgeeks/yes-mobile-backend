import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"

export default function ConfirmDelete({ type, func }) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Trash2 className="mr-2 h-4 w-4 text-red-500 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>

                    <DialogDescription>
                        Are You Sure You Want To Delete This <span className="capitalize">{type}</span>.
                    </DialogDescription>
                </DialogHeader>

                <div className='flex items-center justify-around'>
                    <DialogClose>
                        <button className='border rounded px-4 py-2 hover:bg-gray-200 cursor-pointer'>
                            Cancel
                        </button>

                    </DialogClose>

                    <DialogClose asChild>
                        <button
                            onClick={func}
                            className='cursor-pointer bg-red-500 px-4 py-2 rounded text-white'
                        >
                            Delete <span className="capitalize">{type}</span> from Database
                        </button>
                    </DialogClose>
                </div>


            </DialogContent>
        </Dialog>
    )
}
