import { useForm } from "@inertiajs/react";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { useState } from 'react';


export default function CreateCategorie() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',

    });

    const [open, setOpen] = useState(false);



    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('Categorie.store'), {
            onSuccess: () => {
                setData({
                    name: '',
                });
                setOpen(false);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">+ ADD Categorie</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90%] sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adding a Program</DialogTitle>
                    <DialogDescription>Create a new program for the application.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-1 sm:space-y-4 grid grid-cols-2 gap-2">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>


                    <button
                        type="submit"
                        disabled={processing}
                        className="col-span-2 bg-alpha text-white py-2 px-4 rounded-md cursor-pointer "
                    >
                        {processing ? 'Processing...' : 'Create categorie'}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
