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
import DeleteSpeaker from '../speakers/components/deleteSpeaker';
import { useState } from 'react';
import axios from "axios";
import ParticipantStore from '../participants/components/participantStore';

const breadcrumbs = [
    {
        title: 'Moderators',
        href: '/moderators',
    },
];


const Moderator = () => {
    const { moderators } = usePage().props;
    const [dialogOpen, setDialogOpen] = useState(false);
    const resetpassword = (email) => {
        if (confirm(`Are you sure you want to reset the password for ${email}?`)) {
            axios.post('api/participant/resetPassword', { email })
                .then(() => {
                    alert('Password reset link sent to ' + email);
                })
                .catch(() => {
                    alert('Failed to send password reset link.');
                });
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Moderators' />
            <div className="p-3 lg:p-6">
                <div className="flex justify-end py-3 gap-3">
                    <a href="participant/export/moderator"
                        className='bg-beta text-white px-4 py-1 rounded'
                    >
                        Export Moderators
                    </a>
                    <ParticipantStore
                        title='Moderator'
                        role='moderator'
                        endPoint='funders.store'
                    />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {moderators.map((mod, index) => (
                        <Card key={index} className="flex flex-col items-center gap-2 rounded-lg border p-4 relative">
                            <div className="flex self-end gap-2">
                                <ParticipantStore
                                    participant={mod}
                                    endPoint='participants.update'
                                    role='funder'
                                />
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="ml-auto">
                                        <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-48">
                                        <DropdownMenuItem onClick={() => resetpassword(mod.email)}>
                                            Reset Password
                                        </DropdownMenuItem>

                                        <DropdownMenuItem
                                            onClick={() => router.visit(`account/show/${mod.id}`)}
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
                                                speaker={mod}
                                                trigger={<>Delete Moderator</>}
                                                open={dialogOpen}
                                                setOpen={setDialogOpen}
                                            />
                                        </DropdownMenuItem>

                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <img src={`/storage/${mod.image}`} alt={mod.name} className="mb-4 h-24 w-24 rounded-full object-cover" />
                            <h3 className="text-lg font-semibold">{mod.name}</h3>
                            <p className='text-muted-foreground lowercase'>{mod.email}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Moderator;
