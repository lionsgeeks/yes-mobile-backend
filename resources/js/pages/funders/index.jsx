import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import ParticipantStore from '../participants/components/participantStore';
import { useState } from 'react';
import DeleteSpeaker from '../speakers/components/deleteSpeaker';
import { Building2, Mail, UserCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
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
            sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sponsor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sponsor.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Funders" />

            <div className='p-6 '>
                <div className='flex justify-end'>
                    <ParticipantStore
                        title='Funder'
                        role='funder'
                        endPoint='funders.store'
                    />
                </div>

                <input type="search" name="search" id="search"
                    className='rounded border-2 mb-3 w-[20vw] p-2'
                    placeholder='Search by name, email or description'
                    onChange={((e) => { setSearchQuery(e.target.value) })}
                />


                <div className='grid grid-cols-3 gap-2'>
                    {
                        filteredSponsors.map((participant, index) => (
                            <>
                                <div
                                    key={index}
                                    onClick={() => router.visit(`/funders/show/${participant.id}`)}
                                    className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                                >
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
                                            <p className="text-sm text-gray-600 flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-gray-500" />
                                                {participant.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                                            <Building2 className="w-4 h-4 text-gray-500" /> Interests
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {participant.interesets?.length > 0 ? (
                                                participant.interesets.map((int, idx) => (
                                                    <Badge key={idx} variant="secondary" className="capitalize">
                                                        {int.name}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <p className="text-sm text-gray-500">No Interests Selected</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-4 flex items-center gap-2">
                                        <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-gray-500" /> Role
                                        </h4>
                                        <Badge className="capitalize">{participant.role}</Badge>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="ml-auto">
                                                <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-48">
                                                <DropdownMenuItem onClick={() => alert(`Reset password for ${participant.name}`)}>
                                                    Reset Password
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    className="text-red-600 cursor-pointer"
                                                    onSelect={e => {
                                                        e.preventDefault();
                                                        setDialogOpen(true);
                                                    }}
                                                >
                                                    Delete Account
                                                </DropdownMenuItem>

                                                <DeleteSpeaker
                                                    id={participant.id}
                                                    trigger={<></>}
                                                    open={dialogOpen}
                                                    setOpen={setDialogOpen}
                                                />
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                    </div>

                                </div>
                            </>
                        ))
                    }
                </div>
            </div>
        </AppLayout>
    )
}
