import { Card } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import CreateSpeaker from './components/createSpeaker';
import DeleteSpeaker from './components/deleteSpeaker';
import UpdateSpeaker from './components/updateSpeaker';
const Speaker = () => {
    const { speakers } = usePage().props;
    console.log('speakers', speakers);
    return (
        <AppLayout>
            <div className="p-3 lg:p-6">
                <div className="flex justify-end py-3">
                    <CreateSpeaker />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {speakers.map((speaker) => (
                        <Card key={speaker.id} className="flex flex-col items-center rounded-lg border p-4">
                            {/* <div className="flex self-end">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Edit className="mr-2 h-4 w-4" />
                                            <UpdateSpeaker speaker={speaker} />
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            <DeleteSpeaker id={speaker.id} />
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div> */}
                            <img src={`/storage/${speaker.image}`} alt={speaker.name} className="mb-4 h-24 w-24 rounded-full" />
                            <h3 className="text-lg font-semibold">{speaker.name}</h3>
                            <DeleteSpeaker id={speaker.id} />
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Speaker;
