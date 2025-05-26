import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';


const breadcrumbs = [
    {
        title: 'Bug Reports',
        href: '/reports',
    },
];

const ReporterPage = () => {
    const { reports } = usePage().props;
    const { delete: destroy } = useForm();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setHandleAll(false);
        setOpenDialog(true);
    };

    const handleConfirmDelete = () => {
        if (selectedId) {
            console.log('Deleting report with ID:', selectedId);
            destroy(route('reporters.destroy', { reporter: selectedId }), {
                onSuccess: () => {
                    setOpenDialog(false);
                    setSelectedId(null);
                },
                onError: () => {
                    setOpenDialog(false);
                    setSelectedId(null);
                },
            });
        }
    };

    const [handleAll, setHandleAll] = useState(false);
    const handleDeleteAll = () => {
        destroy(route('report.deleteAll'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Bug Reports' />
            <div className="p-6 ">
                <div className='flex items-center justify-end'>
                    <button
                        className="mb-4 bg-red-500 text-white px-4 py-2 rounded text-sm"
                        onClick={() => {
                            setSelectedId(null);
                            setHandleAll(true);
                            setOpenDialog(true);
                        }}
                    >
                        DELETE ALL REPORTS
                    </button>
                </div>
                <h1 className="mb-4 text-2xl font-bold">Bug Reports</h1>
                <div className='shadow-md rounded p-2'>
                    <Table className="w-full overflow-hidden ">
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Error Name</TableHead>
                                <TableHead>Reported By</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Device System</TableHead>
                                <TableHead>Screen Name</TableHead>
                                <TableHead>Delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reports.map((report, idx) => (
                                <TableRow key={idx} className="h-[7vh]">
                                    <TableCell className='whitespace-pre-line break-words max-w-[500px]'>{report.id}</TableCell>
                                    <TableCell className='whitespace-pre-line break-words max-w-[500px]'>{report.name}</TableCell>
                                    <TableCell>{report.participant.name}</TableCell>
                                    <TableCell>{new Date(report.time).toLocaleString()}</TableCell>
                                    <TableCell className="capitalize">{report.operator_system}</TableCell>
                                    <TableCell className="lowercase">/{report.screen_name}</TableCell>
                                    <TableCell className="flex items-center justify-center">
                                        <button
                                            className="cursor-pointer"
                                            type="button"
                                            onClick={() => handleDeleteClick(report.id)}
                                        >
                                            <Trash2 size={20} color='#fb2c36' />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Delete</DialogTitle>
                            <DialogDescription className="capitalize">
                                Are you sure you want to delete {handleAll ? <span className='text-red-500 text-lg font-bold'>All</span> : 'this'} report? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setOpenDialog(false)}>
                                Cancel
                            </Button>
                            {selectedId && (<Button className="bg-red-500 text-white" onClick={handleConfirmDelete}>
                                Delete
                            </Button>)}
                            {
                                handleAll && (
                                    <Button className="bg-red-500 text-white" onClick={handleDeleteAll}>
                                        Delete
                                    </Button>)
                            }
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
};

export default ReporterPage;
