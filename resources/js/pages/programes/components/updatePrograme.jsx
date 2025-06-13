import { useForm } from "@inertiajs/react";
import { Input } from '@/components/ui/input';
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

export default function UpdatePrograme({ programe, speakers, moderators, categories }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: programe?.name || '',
        description: programe?.description || '',
        start_date: programe?.start_date || '',
        end_date: programe?.end_date || '',
        capacity: programe?.capacity || '',
        location: programe?.location || '',
        date: programe?.date || '',
        category_id: programe?.category_id || '',
        speaker_ids: programe?.participants
            ?.filter(p => p?.role === 'speaker')
            .map(p => p.id) || [],

        moderator_ids: programe?.participants
            ?.filter(p => p?.role === 'moderator')
            .map(p => p.id) || [],

    });
    const currentCategory = categories.find(category => category.id === programe.category_id);
    console.log(currentCategory);

    const [open, setOpen] = useState(false);

    // Reset form data when modal opens/closes or programe changes
    useEffect(() => {
        if (open && programe) {
            setData({
                name: programe.name || '',
                description: programe.description || '',
                start_date: programe.start_date || '',
                end_date: programe.end_date || '',
                capacity: programe.capacity || '',
                location: programe.location || '',
                date: programe.date || '',
                speaker_ids: programe?.participants
                    ?.filter(p => p?.role === 'speaker')
                    .map(p => p.id) || [],

                moderator_ids: programe?.participants
                    ?.filter(p => p?.role === 'moderator')
                    .map(p => p.id) || [],
            });
        }
        if (!open) {
            reset();
        }
    }, [open, programe]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('programe.update', programe.id), {
            onSuccess: () => {
                setOpen(false);
            }
        });
    };
    const handleSpeakerChange = (e) => {
        const value = parseInt(e.target.value);
        if (e.target.checked) {
            if (!data.speaker_ids.includes(value)) {
                setData('speaker_ids', [...data.speaker_ids, value]);
            }
        } else {
            setData('speaker_ids', data.speaker_ids.filter(id => id !== value));
        }
    };

    const handlemoderatorChange = (e) => {
        const value = parseInt(e.target.value);
        if (e.target.checked) {
            if (!data.moderator_ids.includes(value)) {
                setData('moderator_ids', [...data.moderator_ids, value]);
            }
        } else {
            setData('moderator_ids', data.moderator_ids.filter(id => id !== value));
        }
    };

    // console.log(programe.participants[0]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="cursor-pointer" asChild>
                <Pen size={20} color="#00ff00" />
            </DialogTrigger>
            <DialogContent className="max-w-[90%] h-[90%] overflow-y-auto sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Program</DialogTitle>
                    <DialogDescription>Update the program details.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-1 sm:space-y-1c grid grid-cols-2 gap-2">

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
                        <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date:</label>
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
                        <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date:</label>
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
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-2 py-1"
                        ></textarea>
                        {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                    </div>

                    <div className="col-span-2">
                        <label className="block text-lg font-bold text-gray-700 mb-5">moderators:</label>
                        <div className="space-y-2 flex items-center flex-wrap gap-2">
                            {moderators.map((moderator) => (
                                <div key={moderator.id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id={`moderator-${moderator.id}`}
                                        value={moderator.id}
                                        checked={data.moderator_ids.includes(moderator.id) || data.moderator_ids.includes(String(moderator.id))}
                                        onChange={handlemoderatorChange}
                                        className="rounded border-gray-300 accent-alpha "
                                    />
                                    <label htmlFor={`moderator-${moderator.id}`} className="text-sm text-gray-700">
                                        {moderator.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.moderator_ids && <div className="text-red-500 text-sm">{errors.moderator_ids}</div>}
                    </div>

                    <div className="col-span-2">
                        <label className="block text-lg font-bold text-gray-700 mb-5">Speakers:</label>
                        <div className="space-y-2 flex items-center gap-2 flex-wrap w-full">
                            {speakers.map((speaker) => (
                                <div key={speaker.id} className="flex items-center w-full space-x-2">
                                    <input
                                        type="checkbox"
                                        id={`speaker-${speaker.id}`}
                                        value={speaker.id}
                                        checked={data.speaker_ids.includes(speaker.id) || data.speaker_ids.includes(String(speaker.id))}
                                        onChange={handleSpeakerChange}
                                        className="rounded border-gray-300 accent-alpha "
                                    />
                                    <label htmlFor={`speaker-${speaker.id}`} className="text-sm text-gray-700">
                                        {speaker.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.speaker_ids && <div className="text-red-500 text-sm">{errors.speaker_ids}</div>}
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
                        <select
                            id="category_id"
                            name="category_id"
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        >
                            {
                                currentCategory &&
                                    (
                                        <option value={currentCategory?.id}>{currentCategory?.name}</option>
                                    )
                            }
                            <option value="" disabled >Select category</option>
                            <option value="">No Category</option>
                            {categories
                                .filter((categorie) => categorie.id !== currentCategory?.id)

                                .map((categorie) => (
                                    <option key={categorie.id} value={categorie.id}>
                                        {categorie.name}
                                    </option>
                                ))}

                        </select>
                        {errors.category_id && <div className="text-red-500 text-sm">{errors.category_id}</div>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="col-span-2 bg-alpha text-white py-2 px-4 rounded-md cursor-pointer hover:bg-alpha/80"
                    >
                        {processing ? 'Processing...' : 'Update Program'}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
