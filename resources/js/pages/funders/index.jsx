import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import ParticipantStore from '../participants/components/participantStore';
import { useState } from 'react';
import DeleteSpeaker from '../speakers/components/deleteSpeaker';

const breadcrumbs = [
    {
        title: 'Funders',
        href: '/funders',
    },
];

export default function Funders() {
    const { funders } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');


    const filteredSponsors = funders.filter(
        (sponsor) =>
            sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sponsor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sponsor.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Funders" />

            <div className='p-6 '>
                <div className='flex justify-end'>
                    <ParticipantStore
                        title='Funder'
                        role='funder'
                        endPoint='funders.store'
                    />
                </div>

                <input type="search" name="search" id="search"
                    className='rounded border-2 mb-3 w-[20vw] p-2'
                    placeholder='Search by name, email or description'
                    onChange={((e) => { setSearchQuery(e.target.value) })}
                />


                <div className='grid grid-cols-3 gap-2'>
                    {
                        filteredSponsors.map((fund, index) => (
                            <div onClick={() => router.visit(`/funders/show/${fund.id}`)}
                                key={index} className='p-4 shadow-lg rounded'>
                                <div className='flex items-center gap-5'>
                                {console.log(fund)}
                                    <img src={'storage/' + fund.image}
                                        className='rounded-full w-20 aspect-square object-cover'
                                        alt="" />
                                    <div>
                                        <p className='text-xl font-semibold'>{fund.name}</p>
                                        <p className='text-muted-foreground'>{fund.email}</p>
                                    </div>
                                </div>

                                {
                                    fund.description && (
                                        <div className='mt-4'>
                                            <p className='text-lg underline'>Bio :</p>
                                            <p>{fund.description}</p>
                                        </div>)
                                }
                                <div className='flex justify-end mt-4'>
                                    <DeleteSpeaker id={fund.id} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </AppLayout>
    )
}
