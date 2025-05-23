import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    {
        title: 'Funders ',
        href: '/funders',
    },
    {
        title: 'Show Funders',
        href: '#',
    },
];

const FunderShow = ({ funder }) => {
    console.log(funder);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Funder - ${funder.name}`} />
            <div className="w-[90%] mx-auto mt-10 bg-white rounded-lg shadow p-8 flex flex-col items-center space-y-6">
                <img
                    src={`/storage/${funder.image}`} 
                    className="rounded-full w-32 h-32 object-cover border-4 border-primary-500 shadow"
                    alt={funder.name}
                />
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">{funder.name}</h1>
                    <p className="text-gray-500 mt-2">{funder.email}</p>
                </div>
            </div>
        </AppLayout>
    );
};

export default FunderShow;
