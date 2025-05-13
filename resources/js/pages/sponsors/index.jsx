import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import SponsorModal from './components/sponsorModal';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building2, Mail, UserCircle } from 'lucide-react';
import ConfirmDelete from '@/components/confirm-delete';

const breadcrumbs = [
    {
        title: 'Sponsors',
        href: '/sponsors',
    },
];

export default function Sponsors() {
    const { sponsors } = usePage().props;
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        destroy(route('sponsors.destroy', id))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sponsors" />

            <div className='p-6"'>
                <div className='flex justify-end'>
                    <SponsorModal />
                </div>
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead>
                                ID
                            </TableHead>
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
                                    <span>Website</span>
                                </div>
                            </TableHead>
                            <TableHead
                                className="w-[150px] cursor-pointer hover:bg-slate-100 transition-colors"
                            >
                                <div className="flex items-center">
                                    <Building2 className="mr-2 h-4 w-4 text-slate-500" />
                                    <span>Type</span>
                                </div>
                            </TableHead>
                            <TableHead>
                                <p>Actions</p>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sponsors.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="h-24 text-center">
                                    No sponsors found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            sponsors.map((sponsor, index) => (
                                <TableRow key={index} className="hover:bg-slate-50 transition-colors">
                                    <TableCell>
                                        {sponsor.id}
                                    </TableCell>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <img src={'storage/' + sponsor.image} className='w-12 aspect-square object-cover rounded-full '

                                            alt="" />
                                        <p>{sponsor.name}</p>
                                    </TableCell>
                                    <TableCell className="text-slate-600">{sponsor.website}</TableCell>
                                    <TableCell>
                                        <p className='capitalize'>{sponsor.type}</p>
                                    </TableCell>
                                    <TableCell>
                                        <div className='flex items-center gap-2'>
                                            {/* update component */}
                                            <SponsorModal sponsor={sponsor} />

                                            {/* component for confirming deletion */}
                                            <ConfirmDelete type="sponsor" func={() => { handleDelete(sponsor.id) }} />

                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    )
}
