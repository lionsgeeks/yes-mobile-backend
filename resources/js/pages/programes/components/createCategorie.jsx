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
        description: '',
        location: '',
        start_date: '',
        end_date: '',
        date: '',

    });

    const [open, setOpen] = useState(false);



    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('Categorie.store'), {
            onSuccess: () => {
                setData({
                    name: '',
                    description: '',
                    location: '',
                    start_date: '',
                    end_date: '',
                    date: '',
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
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                        <Input
                            type="text"
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">location:</label>
                        <Input
                            type="text"
                            id="location"
                            name="location"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.location && <div className="text-red-500 text-sm">{errors.location}</div>}
                    </div>


                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
                        <Input
                            type="date"
                            id="date"
                            name="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.date && <div className="text-red-500 text-sm">{errors.date}</div>}
                    </div>



                    <div>
                        <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Time:</label>
                        <Input
                            type="time"
                            id="start_date"
                            name="start_date"
                            value={data.start_date}
                            onChange={(e) => setData('start_date', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.start_date && <div className="text-red-500 text-sm">{errors.start_date}</div>}
                    </div>

                    <div>
                        <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Time:</label>
                        <Input
                            type="time"
                            id="end_date"
                            name="end_date"
                            value={data.end_date}
                            onChange={(e) => setData('end_date', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.end_date && <div className="text-red-500 text-sm">{errors.end_date}</div>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing} d
                        className="col-span-2 bg-alpha text-white py-2 px-4 rounded-md cursor-pointer "
                    >
                        {processing ? 'Processing...' : 'Create categorie'}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
