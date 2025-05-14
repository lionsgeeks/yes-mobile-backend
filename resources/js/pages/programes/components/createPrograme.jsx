import { useForm } from "@inertiajs/react";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

export default function CreatePrograme() {

      const { data, setData, post, processing, errors } = useForm({
            name: '',
            description: '',
            start_date: '',
            end_date: '',
            capacity: '',
            location: '',
            date: '',
        });
    const [open, setOpen] = useState(false);

        const handleSubmit = (e) => {
            e.preventDefault();
            post(route('programe.store'));
            setData({
                name: '',
                description: '',
                start_date: '',
                end_date: '',
                capacity: '',
                location: '',
                date: '',
            });
            setOpen(false);
        };


      

        return (

                 <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="cursor-pointer">+ ADD Programe</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Adding a Participant</DialogTitle>
                                <DialogDescription>Create a new participant account for the application.</DialogDescription>
                            </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                ></textarea>
                                {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                            </div>
                            <div>
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date:</label>
                                <input
                                    type="time"
                                    id="start_date"
                                    name="start_date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.start_date && <div className="text-red-500 text-sm">{errors.start_date}</div>}
                            </div>
                            <div>
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date:</label>
                                <input
                                    type="time"
                                    id="end_date"
                                    name="end_date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.end_date && <div className="text-red-500 text-sm">{errors.end_date}</div>}
                            </div>
                            <div>
                                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacity:</label>
                                <input
                                    type="number"
                                    id="capacity"
                                    name="capacity"
                                    value={data.capacity}
                                    onChange={(e) => setData('capacity', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.capacity && <div className="text-red-500 text-sm">{errors.capacity}</div>}
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location:</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.location && <div className="text-red-500 text-sm">{errors.location}</div>}
                            </div>
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.date && <div className="text-red-500 text-sm">{errors.date}</div>}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {processing ? 'Processing...' : 'Create Program'}
                            </button>
                        </form>
                        </DialogContent>
                    </Dialog>

    );



}
