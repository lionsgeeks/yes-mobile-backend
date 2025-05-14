import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import CreatePrograme from './components/createPrograme';
import { router } from '@inertiajs/react';
import DeletePrograme from './components/deletePrograme';

const breadcrumbs = [
    {
        title: 'Programes',
        href: '/programe',
    },
];
const Programe = ({ programes }) => {


    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Programes" />
            <div className="p-3 lg:p-6">

                <div className="flex justify-end py-3">
                    <CreatePrograme />
                </div>


                <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Programs</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" >
                        {programes && programes.map((program, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg p-4" >
                                <h3 className="text-lg font-bold text-gray-800">{program.name}</h3>
                                <p className="text-sm text-gray-600">{program.description}</p>
                                <p className="text-sm text-gray-600 mt-2">
                                    <strong>Start Date:</strong> {program.start_date}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>End Date:</strong> {program.end_date}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Capacity:</strong> {program.capacity}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Location:</strong> {program.location}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Date:</strong> {program.date}
                                </p>

                                <div className="flex gap-x-2 mt-4">
                                    <DeletePrograme id={program.id} />

                                    <button className='cursor-pointer rounded bg-blue-500 px-3 py-2 text-white' onClick={() => router.visit(`/programe/show/${program.id}`)}>Details</button>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </AppLayout>

    );
};

export default Programe;
