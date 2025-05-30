import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import * as React from 'react';

export default function ImportExcelDialog({role}) {
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const [error, setError] = React.useState('');
    const { data, setData, post } = useForm({
        file: null,
        role:role
    });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
            setError('File size should not exceed 5 MB.');
            setFile(null);
            setData('file', null);
        } else {
            setError('');
            setFile(selectedFile);
            setData('file', selectedFile);
        }
    };

    const handleImport = () => {
        if (file) {
            post(route('participant.import'), {
                onSuccess: () => {
                    setData({
                        file: null,
                        role:role,
                    });
                    setOpen(false);
                    setFile(null);
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Import Excel</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Import Participants from Excel</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                </div>
                <DialogFooter>
                    <Button className="cursor-pointer" variant="destructive" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button className="cursor-pointer" onClick={handleImport} disabled={!file || !!error}>
                        Import
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}