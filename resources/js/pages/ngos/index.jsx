import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Instagram, Linkedin, LinkIcon, MoreVertical, UserCircle, Youtube } from 'lucide-react';
import { useState } from 'react';
import ParticipantStore from '../participants/components/participantStore';
import DeleteSpeaker from '../speakers/components/deleteSpeaker';
import ImportExcelDialog from '../participants/components/importDialog';

const breadcrumbs = [
    {
        title: 'NGO',
        href: '/ngo',
    },
];

export default function Ngo() {
    const { ngos } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    const filteredNgos = ngos.filter(
        (sponsor) =>
            sponsor.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
            sponsor.email?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
            sponsor.description?.toLowerCase().includes(searchQuery?.toLowerCase()),
    );

    const resetpassword = (email) => {
        if (confirm(`Are you sure you want to reset the password for ${email}?`)) {
            axios
                .post('api/participant/resetPassword', { email })
                .then(() => {
                    alert('Password reset link sent to ' + email);
                })
                .catch(() => {
                    alert('Failed to send password reset link.');
                });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="NGO" />

            <div className="p-6">
                <div className="flex flex-col-reverse justify-between gap-2 lg:flex-row lg:items-center">
                    <input
                        type="search"
                        name="search"
                        id="search"
                        className="mb-3 w-full rounded border-2 p-2 lg:w-[20vw]"
                        placeholder="Search by name, email or description"
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                    />
                    <div className='flex gap-3'>
                        <ParticipantStore title="Ngo" role="ngo" endPoint="ngos.store" />
                        <ImportExcelDialog role={'ngo'} />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
                    {filteredNgos.map((participant, index) => (
                        <div key={index}>
                            <div className="rounded-lg border p-4 shadow-sm transition hover:shadow-md">
                                <div className="flex justify-end">
                                    <div className='flex items-center gap-2'>
                                        <ParticipantStore participant={participant} endPoint="participants.update" role="ngo" />
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="ml-auto">
                                                <MoreVertical className="h-5 w-5 cursor-pointer text-gray-600" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-48">
                                                <DropdownMenuItem onClick={() => resetpassword(participant.email)}>Reset Password</DropdownMenuItem>

                                                <DropdownMenuItem onClick={() => router.visit(`/account/show/${participant.id}`)}>
                                                    View Information
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    className="cursor-pointer text-red-600"
                                                    onSelect={(e) => {
                                                        e.preventDefault();
                                                        setDialogOpen(true);
                                                    }}
                                                >
                                                    <DeleteSpeaker
                                                        speaker={participant}
                                                        trigger={<>Delete NGO</>}
                                                        open={dialogOpen}
                                                        setOpen={setDialogOpen}
                                                    />
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>

                                <div className="mb-4 flex items-center gap-4">
                                    <img
                                        src={'storage/' + participant.image}
                                        alt={participant.name}
                                        className="h-16 w-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="flex items-center gap-2 text-lg font-semibold">
                                            <UserCircle className="h-4 w-4 text-gray-500" />
                                            {participant.name}
                                        </h3>
                                    </div>
                                </div>
                                <div className="mb-3">
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
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
