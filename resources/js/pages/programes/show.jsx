import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    {
        title: 'Programes',
        href: '/programe',
    },
    {
        title: 'Show Program',
        href: '#',
    },
];

const ProgramShow = ({ programe }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Program - ${programe.name}`} />
            <div className="p-3 lg:p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Program Details</h1>

                <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
                    <p className="text-gray-700 mb-2">
                        <strong className="text-gray-800">Name:</strong> {programe.name}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong className="text-gray-800">Description:</strong> {programe.description}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong className="text-gray-800">Start Date:</strong> {programe.start_date}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong className="text-gray-800">End Date:</strong> {programe.end_date}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong className="text-gray-800">Capacity:</strong> {programe.capacity}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong className="text-gray-800">Location:</strong> {programe.location}
                    </p>
                    <p className="text-gray-700">
                        <strong className="text-gray-800">Date:</strong> {programe.date}
                    </p>
                </div>
            </div>
        </AppLayout>
    );
};

export default ProgramShow;
