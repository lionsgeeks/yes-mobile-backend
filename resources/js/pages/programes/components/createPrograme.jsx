import { useForm } from "@inertiajs/react";
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { useState } from 'react';

export default function CreatePrograme({ speakers }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        capacity: '',
        location: '',
        date: '',
        speaker_ids: [],// Array for multiple speakers
    });

    const [open, setOpen] = useState(false);



    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('programe.store'), {
            onSuccess: () => {
                setData({
                    name: '',
                    description: '',
                    start_date: '',
                    end_date: '',
                    capacity: '',
                    location: '',
                    date: '',
                    speaker_ids: [],
                });
                setOpen(false);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">+ ADD Programe</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adding a Program</DialogTitle>
                    <DialogDescription>Create a new program for the application.</DialogDescription>
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
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        ></textarea>
                        {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                    </div>

                    <div>
                        <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Time:</label>
                        <input
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
                        <input
                            type="time"
                            id="end_date"
                            name="end_date"
                            value={data.end_date}
                            onChange={(e) => setData('end_date', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.date && <div className="text-red-500 text-sm">{errors.date}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Speakers:</label>
                        <div className="space-y-2">
                            {speakers.map((speaker) => (
                                <div key={speaker.id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id={`speaker-${speaker.id}`}
                                        value={speaker.id}
                                        onChange={(e) => {

                                            setData('speaker_ids', [...data.speaker_ids, e.target.value]);

                                        }}
                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                                    />

                                    <label htmlFor={`speaker-${speaker.id}`} className="text-sm text-gray-700">
                                        {speaker.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.speaker_ids && <div className="text-red-500 text-sm">{errors.speaker_ids}</div>}
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
