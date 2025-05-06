import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import ParticipantStore from './components/participantStore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {  UserCircle, Mail, Building2 } from "lucide-react"


const breadcrumbs = [
    {
        title: 'Participants',
        href: '/participants',
    },
];

export default function Participants() {
    const { participants } = usePage().props

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Participants" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='flex justify-end'>
                    <ParticipantStore />
                </div>

                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead
                                className="w-[300px] cursor-pointer hover:bg-slate-100 transition-colors"
                                onClick={() => handleSort("name")}
                            >
                                <div className="flex items-center">
                                    <UserCircle className="mr-2 h-4 w-4 text-slate-500" />
                                    <span>Name</span>
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer hover:bg-slate-100 transition-colors"
                                onClick={() => handleSort("email")}
                            >
                                <div className="flex items-center">
                                    <Mail className="mr-2 h-4 w-4 text-slate-500" />
                                    <span>Email</span>
                                </div>
                            </TableHead>
                            <TableHead
                                className="w-[150px] cursor-pointer hover:bg-slate-100 transition-colors"
                                onClick={() => handleSort("role")}
                            >
                                <div className="flex items-center">
                                    <Building2 className="mr-2 h-4 w-4 text-slate-500" />
                                    <span>Role</span>
                                </div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {participants.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="h-24 text-center">
                                    No participants found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            participants.map((participant) => (
                                <TableRow key={participant.id} className="hover:bg-slate-50 transition-colors">
                                    <TableCell className="font-medium">{participant.name}</TableCell>
                                    <TableCell className="text-slate-600">{participant.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={participant.role === "ngo" ? "default" : "secondary"} className="capitalize">
                                            {participant.role}
                                        </Badge>
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
