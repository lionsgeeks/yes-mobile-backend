import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { useForm, usePage } from '@inertiajs/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { useState } from 'react';

const ReporterPage = () => {
    const { reports } = usePage().props;
    const { delete: destroy } = useForm();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setOpenDialog(true);
    };

    const handleConfirmDelete = () => {
        if (selectedId) {
            console.log('Deleting report with ID:', selectedId);
            destroy(route('reporters.destroy', {reporter:selectedId}), {
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

    return (
        <AppLayout title="Bug Reports">
            <div className="p-6">
                <h1 className="mb-4 text-2xl font-bold">Bug Reports</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Error Name</TableHead>
                            <TableHead>User Name</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Device System</TableHead>
                            <TableHead>Screen Name</TableHead>
                            <TableHead>Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports.map((report, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{report.name}</TableCell>
                                <TableCell>{report.participant.name}</TableCell>
                                <TableCell>{new Date(report.time).toLocaleString()}</TableCell>
                                <TableCell>{report.operator_system}</TableCell>
                                <TableCell>{report.screen_name}</TableCell>
                                <TableCell>
                                    <Button
                                        className="bg-red-500 font-medium text-white"
                                        type="button"
                                        onClick={() => handleDeleteClick(report.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Delete</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this report? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setOpenDialog(false)}>
                                Cancel
                            </Button>
                            <Button className="bg-red-500 text-white" onClick={handleConfirmDelete}>
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
};

export default ReporterPage;
