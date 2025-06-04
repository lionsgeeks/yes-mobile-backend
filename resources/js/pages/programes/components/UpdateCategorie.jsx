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
import { useState, useEffect } from 'react';
import { Pen } from "lucide-react";

export default function UpdateCategorie({ category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
        description: category.description || '',
        location: category.location || '',
        start_date: category.start_date || '',
        end_date: category.end_date || '',
        date: category.date || '',
    });

    const [open, setOpen] = useState(false);



    const handleUpdate = (e) => {
        e.preventDefault();
        put(route('Categorie.update', category.id), {
            onSuccess: () => setOpen(false),
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Pen className="cursor-pointer" size={20} color="#00ff00" />
            </DialogTrigger>
            <DialogContent className="max-w-[90%] sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Categorie</DialogTitle>
                    <DialogDescription>Edit the selected categorie.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUpdate} className="space-y-1 sm:space-y-4 grid grid-cols-2 gap-2">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                        <Input
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location:</label>
                        <Input
                            id="location"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                        />
                        {errors.location && <div className="text-red-500 text-sm">{errors.location}</div>}
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
                        <Input
                            type="date"
                            id="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                        />
                        {errors.date && <div className="text-red-500 text-sm">{errors.date}</div>}
                    </div>
                    <div>
                        <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Time:</label>
                        <Input
                            type="time"
                            id="start_date"
                            value={data.start_date}
                            onChange={(e) => setData('start_date', e.target.value)}
                        />
                        {errors.start_date && <div className="text-red-500 text-sm">{errors.start_date}</div>}
                    </div>
                    <div>
                        <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Time:</label>
                        <Input
                            type="time"
                            id="end_date"
                            value={data.end_date}
                            onChange={(e) => setData('end_date', e.target.value)}
                        />
                        {errors.end_date && <div className="text-red-500 text-sm">{errors.end_date}</div>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="col-span-2 bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer"
                    >
                        {processing ? 'Updating...' : 'Update Categorie'}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
