import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import CreatePrograme from './components/createPrograme';
import { router } from '@inertiajs/react';
import DeletePrograme from './components/deletePrograme';
import UpdatePrograme from './components/updatePrograme';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Programes',
        href: '/programe',
    },
];
const Programe = ({ programes, speakers }) => {


    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Programes" />
            <div className="p-3 lg:p-6">

                <div className="flex justify-end py-3">
                    <CreatePrograme speakers={speakers} />
                </div>

                <h2 className="text-2xl font-bold text-alpha mb-4 ">All Programs</h2>
                <div className="mt-8 p-2 shadow rounded ">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Session Title</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Capacity</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Speakers</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {programes && programes.map((program, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <h1>{program.name}</h1>
                                        <p className='text-sm text-muted-foreground whitespace-pre-line break-words w-[250px]'>{program.description}</p>
                                    </TableCell>

                                    <TableCell>{new Date(program.date).toDateString()}</TableCell>
                                    <TableCell>{program.start_date} - {program.end_date}</TableCell>
                                    <TableCell>{program.capacity}</TableCell>
                                    <TableCell>{program.location}</TableCell>
                                    <TableCell>
                                        <div>
                                            {program.participants.length > 0 ?
                                                program.participants.map((speaker, index) => (
                                                    <div key={index} className="flex items-center gap-2">
                                                        <div className="text-sm">
                                                            {speaker.name}
                                                        </div>
                                                    </div>
                                                ))
                                                :
                                                <div className='text-xs text-muted-foreground'>No Speaker Assigned</div>
                                            }
                                        </div>
                                    </TableCell>

                                    <TableCell className='flex gap-x-2 items-center '>
                                        <button className='cursor-pointer' onClick={() => router.visit(`/programe/show/${program.id}`)}>
                                            <Eye size={20} color='#295da6' />
                                        </button>
                                        <UpdatePrograme programe={program} speakers={speakers} />
                                        <DeletePrograme id={program.id} />

                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

            </div>
        </AppLayout>

    );
};

export default Programe;
