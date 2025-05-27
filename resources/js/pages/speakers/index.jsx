import { Card } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { MoreVertical } from 'lucide-react';
import CreateSpeaker from './components/createSpeaker';
import DeleteSpeaker from './components/deleteSpeaker';
import { useState } from 'react';

const breadcrumbs = [
    {
        title: 'Speakers',
        href: '/speakers',
    },
];


const Speaker = () => {
    const { speakers } = usePage().props;
    const [dialogOpen, setDialogOpen] = useState(false);

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
                            <div className="flex self-end">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="ml-auto">
                                        <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-48">
                                        <DropdownMenuItem
                                        // onClick={() => resetpassword(speaker.email)}
                                        onClick={() => {alert('Reset Password functionality is not implemented yet.');}}
                                        >
                                            Reset Password
                                        </DropdownMenuItem>

                                        <DropdownMenuItem
                                            onClick={() => router.visit(`account/show/${speaker.id}`)}
                                        >
                                            View Information
                                        </DropdownMenuItem>

                                        {/* The DeleteSpeaker trigger */}
                                        <DropdownMenuItem
                                            className="text-red-600 cursor-pointer"
                                            onSelect={e => {
                                                e.preventDefault();
                                                setDialogOpen(true);
                                            }}
                                        >
                                            <DeleteSpeaker
                                                speaker={speaker}
                                                trigger={<>Delete Speaker</>}
                                                open={dialogOpen}
                                                setOpen={setDialogOpen}
                                            />
                                        </DropdownMenuItem>

                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <img src={`/storage/${speaker.image}`} alt={speaker.name} className="mb-4 h-24 w-24 rounded-full object-cover" />
                            <h3 className="text-lg font-semibold">{speaker.name}</h3>
                            <p className='text-muted-foreground'>{speaker.email}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Speaker;
