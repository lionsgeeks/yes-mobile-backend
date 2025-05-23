import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import ParticipantStore from './components/participantStore';
import { Badge } from "@/components/ui/badge"
import { UserCircle, Mail, Building2 } from "lucide-react"
import { useState } from 'react';

import DeleteSpeaker from '../speakers/components/deleteSpeaker';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
const breadcrumbs = [
    {
        title: 'Participants',
        href: '/participants',
    },
];

export default function Participants() {
    const { participants } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    const filteredParticipants = participants.filter(
        (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Participants" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-between items-center">
                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Search For Participant"
                        className="border rounded px-2 w-[20vw] h-10"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <ParticipantStore />
                </div>

                {filteredParticipants.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">No participants found.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredParticipants.map((participant) => (
                            <div
                                key={participant.id}
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

                                            {/* The DeleteSpeaker trigger */}
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
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
