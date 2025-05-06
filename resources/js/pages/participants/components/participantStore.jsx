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
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";

export default function ParticipantStore() {

    const { data, setData, post } = useForm({
        name: '',
        email: '',
        company: '',
        image: '',
        location: '',
        description: '',
        country: '',
        city: '',
        role: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('participants.store'), {
            onSuccess: () => setData({
                name: '',
                email: '',
                company: '',
                image: '',
                location: '',
                description: '',
                country: '',
                city: '',
                role: ''
            }),
        });
    }



    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">+ ADD PARTICIPANT</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adding a Participant</DialogTitle>

                    <DialogDescription>
                        Create a new participant account for the application.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 py-4">
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
                        <div className="flex flex-col items-start gap-2">
                            <Label htmlFor="role" className="text-right">
                                Role
                            </Label>
                            {/* <select
                                className="rounded-lg border w-full p-2"
                                name="role" id="role" onChange={(e) => { setData('role', e.target.value) }}>
                                <option defaultValue={""} disabled selected>Select a Role</option>
                                <option value="visitor">Visitor</option>
                                <option value="speaker">Speaker</option>
                                <option value="ngo">NGO</option>
                            </select> */}

                            <Select onValueChange={(value) => setData('role', value)}>
                                <SelectTrigger className="w-full p-2 rounded-lg border">
                                    <SelectValue placeholder="Select a Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="visitor">Visitor</SelectItem>
                                    <SelectItem value="speaker">Speaker</SelectItem>
                                    <SelectItem value="ngo">NGO</SelectItem>
                                </SelectContent>
                            </Select>

                        </div>

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
                        <div className="flex flex-col items-start gap-2">
                            <Label htmlFor="location" className="text-right">
                                Adress
                            </Label>
                            <Input id="location" name="location" placeholder="Address"
                                value={data.location}
                                onChange={(e) => { setData('location', e.target.value) }}
                            />
                        </div>

                        <div className="flex flex-col items-start gap-2 col-span-2">
                            <Label htmlFor="description" className="text-right">
                                Bio
                            </Label>
                            <Textarea
                                onChange={(e) => { setData('description', e.target.value) }}
                                className="p-2 w-full border"
                                placeholder="Short description on the participant if available"
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
