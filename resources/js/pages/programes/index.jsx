import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import CreatePrograme from './components/createPrograme';
import CreateCategorie from './components/createCategorie';
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
const Programe = ({ programes, speakers , categories ,moderators }) => {


    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Programes" />
            <div className="p-2  lg:p-6">

                <div className="flex justify-end gap-x-4 py-3">
                    <CreatePrograme speakers={speakers}  categories={categories} moderators={moderators} />
                    <CreateCategorie />
                </div>

                <h2 className="text-2xl font-bold text-alpha mb-4 ">All Programs</h2>
                <div className="mt-8 p-2 shadow rounded ">
                    <Table className="w-full">
                        <TableHeader className="hidden sm:table-header-group">
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
                            {programes.map((program, index) => (
                                <TableRow
                                    key={index}
                                    className="block sm:table-row border rounded sm:border-b mb-4 sm:mb-0 shadow-sm sm:shadow-none"
                                >
                                    <TableCell className="block sm:table-cell">
                                        <span className="font-semibold sm:hidden">Session Title:</span>
                                        <h1>{program.name}</h1>
                                        <p className="text-sm text-muted-foreground whitespace-pre-line break-words">
                                            {program.description}
                                        </p>
                                    </TableCell>

                                    <TableCell className="block sm:table-cell">
                                        <span className="font-semibold sm:hidden">Date:</span>
                                        {new Date(program.date).toDateString()}
                                    </TableCell>

                                    <TableCell className="block sm:table-cell">
                                        <span className="font-semibold sm:hidden">Time:</span>
                                        {program.start_date} - {program.end_date}
                                    </TableCell>

                                    <TableCell className="block sm:table-cell">
                                        <span className="font-semibold sm:hidden">Capacity:</span>
                                        {program.capacity}
                                    </TableCell>

                                    <TableCell className="block sm:table-cell">
                                        <span className="font-semibold sm:hidden">Location:</span>
                                        {program.location}
                                    </TableCell>

                                    <TableCell className="block sm:table-cell">
                                        <span className="font-semibold sm:hidden">Speakers:</span>
                                        {program.participants.length > 0 ? (
                                            <ul className="ml-2 list-disc">
                                                {program.participants.map((speaker, i) => (
                                                    <li key={i}>{speaker.name}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-xs text-muted-foreground">No Speaker Assigned</p>
                                        )}
                                    </TableCell>

                                    <TableCell className="block sm:table-cell">
                                        <span className="font-semibold sm:hidden">Actions:</span>
                                        <div className="flex gap-2 mt-2 sm:mt-0">
                                            <button
                                                className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                                                onClick={() => router.visit(`/programe/show/${program.id}`)}
                                            >
                                                <Eye size={20} color="#295da6" />
                                            </button>
                                            <UpdatePrograme programe={program} speakers={speakers} categories={categories} moderators={moderators} />
                                            <DeletePrograme id={program.id} />
                                        </div>
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
