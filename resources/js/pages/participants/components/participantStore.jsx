import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@headlessui/react"
import { useForm } from "@inertiajs/react"

export default function ParticipantStore({ title = 'Participant', role = 'visitor', endPoint = 'participants.store' }) {

    const { data, setData, post } = useForm({
        name: '',
        email: '',
        company: '',
        image: '',
        location: '',
        description: '',
        country: '',
        city: '',
        role: role
    });
    console.log('logging', endPoint);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route(endPoint), {
            onSuccess: () => setData({
                name: '',
                email: '',
                company: '',
                image: '',
                location: '',
                description: '',
                country: '',
                city: '',
                role: role
            }),
        });
    }



    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">+ Add {title}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adding a {title}</DialogTitle>

                    <DialogDescription>
                        Create a new {title} account for the application.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className={`grid grid-cols-2 gap-4 py-4`}>
                        <div className="flex flex-col items-start gap-2">
                            <Label htmlFor="name" className="text-right">
                                Name <span className="text-red-600 text-sm">*</span>
                            </Label>
                            <Input id="name" name="name" placeholder="Full Name"
                                required
                                value={data.name}
                                onChange={(e) => { setData('name', e.target.value) }}
                            />
                        </div>
                        <div className="flex flex-col items-start gap-2">
                            <Label htmlFor="email" className="text-right">
                                Email <span className="text-red-600 text-sm">*</span>
                            </Label>
                            <Input id="email" name="email" placeholder="name@example.com"
                                required type="email"
                                value={data.email}
                                onChange={(e) => { setData('email', e.target.value) }}
                            />
                        </div>
                        <div className="flex flex-col items-start gap-2">
                            <Label htmlFor="image" className="text-right">
                                Image
                            </Label>
                            <Input id="image" name="image" type="file" accept="image/*"
                                onChange={(e) => { setData('image', e.target.files[0]) }}
                            />
                        </div>

                        {
                            role == 'visitor' && (
                                <>
                                    <div className="flex flex-col items-start gap-2">
                                        <Label htmlFor="company" className="text-right">
                                            Company
                                        </Label>
                                        <Input id="company" name="company" placeholder="Company Name"
                                            value={data.company}
                                            onChange={(e) => { setData('company', e.target.value) }}
                                        />
                                    </div>
                                    <div className="flex flex-col items-start gap-2">
                                        <Label htmlFor="country" className="text-right">
                                            Country
                                        </Label>
                                        <Input id="country" name="country" placeholder="Country"
                                            value={data.country}
                                            onChange={(e) => { setData('country', e.target.value) }}
                                        />
                                    </div>
                                    <div className="flex flex-col items-start gap-2">
                                        <Label htmlFor="city" className="text-right">
                                            City
                                        </Label>
                                        <Input id="city" name="city" placeholder="City"
                                            value={data.city}
                                            onChange={(e) => { setData('city', e.target.value) }}
                                        />
                                    </div>
                                    <div className="flex flex-col items-start gap-2 col-span-2">
                                        <Label htmlFor="location" className="text-right">
                                            Adress
                                        </Label>
                                        <Input id="location" name="location" placeholder="Address"
                                            value={data.location}
                                            onChange={(e) => { setData('location', e.target.value) }}
                                        />
                                    </div>
                                </>
                            )
                        }



                        <div className="flex flex-col items-start gap-2 col-span-2">
                            <Label htmlFor="description" className="text-right">
                                Bio
                            </Label>
                            <Textarea
                                onChange={(e) => { setData('description', e.target.value) }}
                                className="p-2 w-full border"
                                placeholder="Short description if available"
                                value={data.description}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit">Save changes</Button>
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    )
}
