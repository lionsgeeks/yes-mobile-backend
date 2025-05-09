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
import { PenIcon } from "lucide-react"

export default function SponsorStore({ sponsor }) {

    const { data, setData, post, put } = useForm({
        name: sponsor ? sponsor.name : '',
        image: sponsor ? sponsor.image : '',
        website: sponsor ? sponsor.website : '',
        description: sponsor ? sponsor.description : '',
        type: sponsor ? sponsor.type : '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (sponsor) {
            // put(route('sponsors.update', sponsor.id))
            post(route('sponsors.update', {
                _method: 'put',
                data: data,
                sponsor: sponsor.id
            }))
        } else {
            post(route('sponsors.store'), {
                onSuccess: () => setData({
                    name: '',
                    image: '',
                    website: '',
                    description: '',
                    type: '',
                }),
            });

        }
    }



    return (
        <Dialog>
            <DialogTrigger asChild>
                {
                    !sponsor?.id ?

                        <Button className="cursor-pointer">+ ADD SPONSOR</Button>
                        :
                        <PenIcon className='mr-2 h4 w-4 text-green-500 cursor-pointer' />
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{!sponsor?.id ? 'Adding a Sponsor' : 'Modifying Sponsor'}</DialogTitle>

                    {!sponsor?.id && (
                        <DialogDescription>
                            Add a new sponsor to be viewed in the application.
                        </DialogDescription>)
                    }
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
                            <Label htmlFor="type" className="text-right">
                                Type
                            </Label>

                            <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                <SelectTrigger className="w-full p-2 rounded-lg border">
                                    <SelectValue placeholder="Select a Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="association">Association</SelectItem>
                                    <SelectItem value="media">Media</SelectItem>
                                    <SelectItem value="finance">Finance</SelectItem>
                                    <SelectItem value="technology">Technology</SelectItem>
                                    <SelectItem value="marketing">Marketing</SelectItem>
                                </SelectContent>
                            </Select>

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
                            <Label htmlFor="website" className="text-right">
                                Website
                            </Label>
                            <Input id="website" name="website" placeholder="Website Link"
                                value={data.website} type='url'
                                onChange={(e) => { setData('website', e.target.value) }}
                            />
                        </div>

                        <div className="flex flex-col items-start gap-2 col-span-2">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                onChange={(e) => { setData('description', e.target.value) }}
                                className="p-2 w-full border"
                                placeholder="Short description on the sponsor if available"
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
