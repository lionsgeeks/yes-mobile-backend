import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import ParticipantStore from '../participants/components/participantStore';
import DeleteSpeaker from '../speakers/components/deleteSpeaker';


const breadcrumbs = [
    {
        title: 'NGO',
        href: '/ngo',
    },
];

export default function Ngo() {
    const { ngos } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');


    const filteredNgos = ngos.filter(
        (sponsor) =>
            sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sponsor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sponsor.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="NGO" />

            <div className='p-6'>
                <div className='flex justify-end'>
                    <ParticipantStore
                        title='Ngo'
                        role='ngo'
                        endPoint='ngos.store'
                    />
                </div>

                <input type="search" name="search" id="search"
                    className='rounded border-2 mb-3 w-[20vw] p-2'
                    placeholder='Search by name, email or description'
                    onChange={((e) => { setSearchQuery(e.target.value) })}
                />

                <div className='grid grid-cols-3 gap-2'>
                    {
                        filteredNgos.map((ngo, index) => (
                            <div key={index} className='p-4 shadow-lg rounded'>
                                <div className='flex items-center gap-5'>
                                    <img src={'storage/' + ngo.image}
                                        className='rounded-full w-20 aspect-square object-cover'
                                        alt="" />
                                    <div>
                                        <p className='text-xl font-semibold'>{ngo.name}</p>
                                        <p className='text-muted-foreground'>{ngo.email}</p>
                                    </div>
                                </div>

                                {
                                    ngo.description && (
                                        <div className='mt-4'>
                                            <p className='text-lg underline'>Bio :</p>
                                            <p>{ngo.description}</p>
                                        </div>)
                                }
                                <div className='flex justify-end mt-4'>
                                    <DeleteSpeaker id={ngo.id} />
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </AppLayout>
    )
}
