import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import ParticipantStore from '../participants/components/participantStore';
import { useState } from 'react';
import DeleteSpeaker from '../speakers/components/deleteSpeaker';
import { Instagram, Linkedin, LinkIcon, UserCircle, Youtube } from 'lucide-react';
import axios from "axios";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

const breadcrumbs = [
    {
        title: 'Funders',
        href: '/funders',
    },
];

export default function Funders() {
    const { funders } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);



    const filteredSponsors = funders.filter(
        (sponsor) =>
            sponsor.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
            sponsor.email?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
            sponsor.description?.toLowerCase().includes(searchQuery?.toLowerCase()),
    )

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
            <Head title="Funders" />

            <div className='p-6 '>
                <div className='flex flex-col-reverse gap-3 lg:flex-row lg:items-center lg:justify-between'>
                    <input type="search" name="search" id="search"
                        className='rounded border-2 mb-3 w-full lg:w-[20vw] p-2'
                        placeholder='Search by name, email or description'
                        onChange={((e) => { setSearchQuery(e.target.value) })}
                    />
                    <ParticipantStore
                        title='Funder'
                        role='funder'
                        endPoint='funders.store'
                    />
                </div>



                <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
                    {
                        filteredSponsors.map((participant, index) => (
                            <div key={index}>

                                <div

                                    className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                                >
                                    <div className='flex justify-end'>
                                        <div className='flex justify-end gap-2'>
                                            <ParticipantStore
                                                participant={participant}
                                                endPoint='participants.update'
                                                role='funder'
                                            />
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="ml-auto">
                                                    <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-48">
                                                    <DropdownMenuItem onClick={() => resetpassword(participant.email)}>
                                                        Reset Password
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem
                                                        onClick={() => router.visit(`/account/show/${participant.id}`)}
                                                    >
                                                        View Information
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem
                                                        className="text-red-600 cursor-pointer"
                                                        onSelect={e => {
                                                            e.preventDefault();
                                                            setDialogOpen(true);
                                                        }}
                                                    >
                                                        <DeleteSpeaker
                                                            speaker={participant}
                                                            trigger={<>Delete Funder</>}
                                                            open={dialogOpen}
                                                            setOpen={setDialogOpen}
                                                        />
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src={'storage/' + participant.image}
                                            alt={participant.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                                <UserCircle className="w-4 h-4 text-gray-500" />
                                                {participant.name}
                                            </h3>
                                        </div>
                                    </div>

                                    {
                                        (participant.social?.linkedin || participant.social?.youtube || participant.social?.website || participant.social?.instagram) ?
                                            <div className="mb-5">
                                                <h4 className=" font-semibold text-gray-800 flex items-center gap-2 mb-3">
                                                    Socials
                                                </h4>
                                                <div className="flex flex-wrap gap-3">
                                                    {participant.social?.website && (
                                                        <a
                                                            href={participant.social?.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-alpha hover:text-blue-700 font-medium transition-all duration-200"
                                                        >
                                                            <LinkIcon size={20} />
                                                        </a>
                                                    )}
                                                    {participant.social?.linkedin && (
                                                        <a
                                                            href={participant.social?.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 hover:text-blue-700 font-medium transition-all duration-200"
                                                        >
                                                            <Linkedin size={20} />
                                                        </a>
                                                    )}
                                                    {participant.social?.youtube && (
                                                        <a
                                                            href={participant.social?.youtube}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-red-600 hover:text-red-800 font-medium transition-all duration-200"
                                                        >
                                                            <Youtube size={20} />
                                                        </a>
                                                    )}
                                                    {participant.social?.instagram && (
                                                        <a
                                                            href={participant.social?.instagram}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-pink-500 hover:text-pink-700 font-medium transition-all duration-200"
                                                        >
                                                            <Instagram size={20} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                            :
                                            null
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </AppLayout>
    )
}
