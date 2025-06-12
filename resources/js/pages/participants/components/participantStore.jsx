import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@headlessui/react"
import { useForm } from "@inertiajs/react"
import { Pen } from "lucide-react"

export default function ParticipantStore({ title = 'Participant', role = 'visitor', endPoint = 'participants.store', participant = null }) {

    const { data, setData, post, put } = useForm({
        name: participant ? participant.name : '',
        email: participant ? participant.email : '',
        company: participant ? participant.company : '',
        image: participant ? participant.image : '',
        location: participant ? participant.location : '',
        description: participant ? participant.description : '',
        country: participant ? participant.country : '',
        city: participant ? participant.city : '',
        role: role,
        website: participant ? participant.social?.website : '',
        linkedin: participant ? participant.social?.linkedin : '',
        youtube: participant ? participant.social?.youtube : '',
        instagram: participant ? participant.social?.instagram : '',
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        if (participant) {
            // update participant
            // put(route(endPoint, participant));
            post(
                route(endPoint, {
                    _method: 'put',
                    data: data,
                    participant: participant.id,
                }),
            );
        } else {
            // create one
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
                    role: role,
                    website: '',
                    linkedin: '',
                    youtube: '',
                    instagram: '',
                }),
            });
        }
    }



    return (
        <Dialog >
            <DialogTrigger asChild>
                <button className={`cursor-pointer  ${participant ? 'text-alpha' : 'text-white bg-alpha px-2 py-1 rounded'}`}>{participant ? <Pen size={18} /> : `Add ${title}`}</button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>{participant ? 'Updating' : `Adding`} {title}</DialogTitle>

                    {
                        !participant && (
                            <DialogDescription>
                                Create a new {title} account for the application.
                            </DialogDescription>
                        )
                    }
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className={`grid grid-cols-3 gap-4 py-4`}>
                        <div className="col-span-3 flex items-center justify-between gap-4">
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

                            {
                                (role != 'funder' && role != 'ngo' && role != 'speaker') && (
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
                                )
                            }


                            <div className="flex flex-col items-start gap-2">
                                <Label htmlFor="image" className="text-right">
                                    Image
                                </Label>
                                <Input id="image" name="image" type="file" accept="image/*"
                                    onChange={(e) => { setData('image', e.target.files[0]) }}
                                />
                            </div>
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
                                    <div className="flex flex-col items-start gap-2 col-span-3">
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



                        <div className="flex flex-col items-start gap-2 col-span-3">
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

                        <div className="grid grid-cols-2 col-span-3 gap-2">
                            <div>
                                <Label htmlFor="website" className="text-right">
                                    Website
                                </Label>
                                <Input id="website" name="web" type="url" placeholder="https://www.website.com"
                                    value={data.website}
                                    onChange={(e) => { setData('website', e.target.value) }}
                                />
                            </div>
                            <div>
                                <Label htmlFor="linkedin" className="text-right">
                                    LinkedIn
                                </Label>
                                <Input id="linkedin" name="linkedin" type="url" placeholder="https://www.linkedin.com/u/username"
                                    value={data.linkedin}
                                    onChange={(e) => { setData('linkedin', e.target.value) }}
                                />
                            </div>
                            <div>
                                <Label htmlFor="youtube" className="text-right">
                                    Youtube
                                </Label>
                                <Input id="youtube" name="youtube" type="url" placeholder="https://www.youtube.com"
                                    value={data.youtube}
                                    onChange={(e) => { setData('youtube', e.target.value) }}
                                />
                            </div>
                            <div>
                                <Label htmlFor="instagram" className="text-right">
                                    Instagram
                                </Label>
                                <Input id="instagram" name="instagram" type="url" placeholder="https://www.instagram.com"
                                    value={data.instagram}
                                    onChange={(e) => { setData('instagram', e.target.value) }}
                                />
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-end">
                        {/* <DialogClose> */}
                            <Button type="submit">Save changes</Button>
                        {/* </DialogClose> */}
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    )
}
