import { Card, CardFooter } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import CreateSpeaker from './components/createSpeaker';
import DeleteSpeaker from './components/deleteSpeaker';
import UpdateSpeaker from './components/updateSpeaker';

const breadcrumbs = [
    {
        title: 'Speakers',
        href: '/speakers',
    },
];


const Speaker = () => {
    const { speakers } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Speakers' />
            <div className="p-3 lg:p-6">
                <div className="flex justify-end py-3">
                    <CreateSpeaker />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {speakers.map((speaker) => (
                        <Card key={speaker.id} className="flex flex-col items-center gap-2 rounded-lg border p-4 relative">
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
                            <img src={`/storage/${speaker.image}`} alt={speaker.name} className="mb-4 h-24 w-24 rounded-full object-cover" />
                            <h3 className="text-lg font-semibold">{speaker.name}</h3>
                            <p className='text-muted-foreground'>{speaker.email}</p>

                            <div className="absolute top-2 right-2 cursor-pointer">
                                <DeleteSpeaker speaker={speaker} />
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Speaker;
