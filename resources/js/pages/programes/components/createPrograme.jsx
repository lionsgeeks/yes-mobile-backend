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


export default function CreatePrograme({ speakers, categories, moderators }) {
    // console.log(categories);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        capacity: '',
        location: '',
        date: '',
        category_id: '',
        speaker_ids: [],// Array for multiple speakers
        moderator_ids: [],// Array for multiple speakers
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
                    moderator_ids: [],
                    category_id: '',
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
            <DialogContent className="max-w-[90%]  h-[90%] overflow-y-auto scroll sm:max-w-[425px]">
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

                    <div>
                        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacity:</label>
                        <Input
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

                    <div className="col-span-2">
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


                    {
                        moderators.length > 0 &&

                        <div className="col-span-2">
                            <label className="block text-lg font-bold text-gray-700 mb-5">moderators:</label>
                            <div className="space-y-2 flex items-center flex-wrap gap-2">
                                {moderators.map((moderator) => (
                                    <div key={moderator.id} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id={`moderator-${moderator.id}`}
                                            value={moderator.id}
                                            onChange={(e) => {
                                                const id = parseInt(e.target.value);
                                                if (e.target.checked) {
                                                    if (!data.moderator_ids.includes(id)) {
                                                        setData('moderator_ids', [...data.moderator_ids, id]);
                                                    }
                                                } else {
                                                    setData(
                                                        'moderator_ids',
                                                        data.moderator_ids.filter((mid) => mid !== id)
                                                    );
                                                }
                                            }}

                                            className="rounded border-gray-300 accent-alpha"
                                        />

                                        <label htmlFor={`moderator-${moderator.id}`} className="text-sm text-gray-700">
                                            {moderator.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.moderator_ids && <div className="text-red-500 text-sm">{errors.moderator_ids}</div>}
                        </div>

                    }
                    {
                        speakers.length > 0 &&

                        <div className="col-span-2">
                            <label className="block text-lg  mb-5 font-bold text-gray-700 ">Speakers:</label>
                            <div className="space-y-2 flex items-center  w-full flex-wrap gap-2">
                                {speakers.map((speaker) => (
                                    <div key={speaker.id} className="flex items-center w-full space-x-2">
                                        <input
                                            type="checkbox"
                                            id={`speaker-${speaker.id}`}
                                            value={speaker.id}
                                            onChange={(e) => {
                                                const id = parseInt(e.target.value);
                                                if (e.target.checked) {
                                                    if (!data.speaker_ids.includes(id)) {
                                                        setData('speaker_ids', [...data.speaker_ids, id]);
                                                    }
                                                } else {
                                                    setData(
                                                        'speaker_ids',
                                                        data.speaker_ids.filter((sid) => sid !== id)
                                                    );
                                                }
                                            }}

                                            className="rounded border-gray-300 accent-alpha"
                                        />

                                        <label htmlFor={`speaker-${speaker.id}`} className="text-sm text-gray-700">
                                            {speaker.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.speaker_ids && <div className="text-red-500 text-sm">{errors.speaker_ids}</div>}
                        </div>
                    }

                    {
                        categories.length > 0 &&

                        <div className="col-span-2">
                            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
                            <select
                                id="category_id"
                                name="category_id"
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="">Select a category</option>
                                {categories.map((categorie) => (
                                    <option key={categorie.id} value={categorie.id}>{categorie.name}</option>
                                ))}
                            </select>
                            {errors.category_id && <div className="text-red-500 text-sm">{errors.category_id}</div>}
                        </div>
                    }



                    <button
                        type="submit"
                        disabled={processing}
                        className="col-span-2 bg-alpha text-white py-2 px-4 rounded-md cursor-pointer "
                    >
                        {processing ? 'Processing...' : 'Create Program'}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
