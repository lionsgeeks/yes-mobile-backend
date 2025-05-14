import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import ParticipantStore from './components/participantStore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { UserCircle, Mail, Building2 } from "lucide-react"
import { useState } from 'react';
import DeleteSpeaker from '../speakers/components/deleteSpeaker';


const breadcrumbs = [
    {
        title: 'Participants',
        href: '/participants',
    },
];

export default function Participants() {
    const { participants } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredParticipants = participants.filter(
        (sponsor) =>
            sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sponsor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sponsor.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Participants" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='flex justify-between'>
                    <input type="search" name="search" id="search" placeholder='Search For Participant'
                        className='border rounded  px-2 w-[20vw]'
                        onChange={(e) => { setSearchQuery(e.target.value) }}
                    />
                    <ParticipantStore />
                </div>

                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead
                                className="w-[300px] cursor-pointer hover:bg-slate-100 transition-colors"
                            >
                                <div className="flex items-center">
                                    <UserCircle className="mr-2 h-4 w-4 text-slate-500" />
                                    <span>Name</span>
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer hover:bg-slate-100 transition-colors"
                            >
                                <div className="flex items-center">
                                    <Mail className="mr-2 h-4 w-4 text-slate-500" />
                                    <span>Email</span>
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer hover:bg-slate-100 transition-colors"
                            >
                                <div className="flex items-center">
                                    <Building2 className="mr-2 h-4 w-4 text-slate-500" />
                                    <span>Interests</span>
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer hover:bg-slate-100 transition-colors"
                            >
                                <div className="flex items-center">
                                    <Building2 className="mr-2 h-4 w-4 text-slate-500" />
                                    <span>Role</span>
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer hover:bg-slate-100 transition-colors"
                            >
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredParticipants.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="h-24 text-center">
                                    No participants found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredParticipants.map((participant) => (
                                <TableRow key={participant.id} className="hover:bg-slate-50 transition-colors">
                                    <TableCell className="font-medium">
                                        <div className='flex items-center gap-2'>
                                            <img src={'storage/' + participant.image}
                                                className='w-12 aspect-square rounded-full'
                                                alt="" />
                                            <p>{participant.name}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-600">{participant.email}</TableCell>
                                    <TableCell>
                                        <div className='flex flex-wrap gap-2'>
                                            {
                                                participant.interesets?.length > 0 ?

                                                    participant.interesets.map((int, ind) => (
                                                        <Badge variant="secondary" className="capitalize">
                                                            {int.name}
                                                        </Badge>
                                                    ))

                                                    :
                                                    'No Interests Selected'
                                            }
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className="capitalize">
                                            {participant.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                            <DeleteSpeaker id={participant.id} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
