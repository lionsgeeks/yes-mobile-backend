import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
export default function CreateSpeaker() {
    const { data, setData, post } = useForm({
        name: '',
        email: '',
        image: '',
        role: 'speaker',
    });
    const [open, setOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const handleSubmit = (e) => {
        console.log('submiting this data :', data);
        e.preventDefault();
        post(route('participants.store'), {
            onSuccess: () => {
                setData({
                    name: '',
                    email: '',
                    image: '',
                    role: 'speaker',
                });
                setImagePreview(null);
                setOpen(false);
            },
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">+ ADD Speaker</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adding a Participant</DialogTitle>
                    <DialogDescription>Create a new participant account for the application.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="py-4 flex flex-col gap-4">
                        <div className="flex flex-col items-start gap-2">
                            <Label htmlFor="name" className="text-right">
                                Name <span className="text-sm text-red-600">*</span>
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Full Name"
                                required
                                value={data.name}
                                onChange={(e) => {
                                    setData('name', e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex flex-col items-start gap-2">
                            <Label htmlFor="email" className="text-right">
                                Email <span className="text-sm text-red-600">*</span>
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="name@example.com"
                                required
                                type="email"
                                value={data.email}
                                onChange={(e) => {
                                    setData('email', e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex flex-col items-start gap-2">
                            <Label htmlFor="image" className="text-right">
                                Image
                            </Label>
                            <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
                            {imagePreview && <img src={imagePreview} alt="Selected Preview" className="mt-2 h-20 w-20 rounded object-cover" />}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">Save changes</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
