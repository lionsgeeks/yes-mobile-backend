import { Head, useForm, usePage } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Calendar, Search, SendIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react";
import ConfirmDelete from "../../components/confirm-delete";

const breadcrumbs = [
    {
        title: 'Send Notifications',
        href: '/notification',
    },
];

export default function Notifications() {
    const { notifs } = usePage().props;
    const { data, setData, post, processing, delete: destroy } = useForm({
        title: '',
        body: '',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('id');
    const [sortDirection, setSortDirection] = useState('asc');


    const toggleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }
    const filteredNotifs = notifs.filter(
        (notif) =>
            notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notif.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notif.sender.toLowerCase().includes(searchQuery.toLowerCase()),
    ).sort((a, b) => {
        if (sortField === "id") {
            return sortDirection === "asc" ? a.id - b.id : b.id - a.id
        } else if (sortField === "created_at") {
            return sortDirection === "asc"
                ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        }
        return 0
    })

    const handleNotif = (e) => {
        e.preventDefault();
        post(route('notifications.store'), {
            onSuccess: () => {
                setData({
                    title: '',
                    body: '',
                });
            }
        });
    }

    const handleDelete = (id) => {
        destroy(route('notifications.destroy', id))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />

            <div className="p-6 flex flex-col lg:grid lg:grid-cols-3 gap-3">
                <form onSubmit={handleNotif} className="flex flex-col justify-around gap-3 p-4 shadow-xl rounded-lg">
                    <div>
                        <h1 className="text-lg font-semibold">Send Notification</h1>
                        <p className="text-muted-foreground text-sm">Create a new notification to send to users</p>
                    </div>

                    <div>
                        <Label htmlFor="title">Notification Title:</Label>
                        <Input type="text" name="title" id="title"
                            value={data.title} placeholder="Notification Title"
                            onChange={(e) => { setData('title', e.target.value) }}
                        />
                        <div className="flex flex-col gap-2 my-4">
                            <Label htmlFor="body">Notification Body:</Label>
                            <textarea type="text" name="body" id="body" rows={8}
                                className="rounded border border-gray-300 p-2"
                                value={data.body} placeholder="Notification Body"
                                onChange={(e) => { setData('body', e.target.value) }}
                            />
                        </div>
                    </div>

                    <Button type="submit" disabled={processing} className="cursor-pointer">
                        <SendIcon /> Send Notification
                    </Button>
                </form>



                <Card className="col-span-2 overflow-auto h-[80vh]">
                    <CardHeader>
                        <CardTitle>Sent Notifications</CardTitle>
                        <CardDescription>History of all notifications sent through the system</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Search and filter section */}
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search notifications..."
                                    className="pl-8"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[80px]">
                                            <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => toggleSort("id")}>
                                                ID
                                                <ArrowUpDown className="ml-1 h-3 w-3" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Body</TableHead>
                                        <TableHead>Sender</TableHead>
                                        <TableHead className="text-right">Receivers</TableHead>
                                        <TableHead>
                                            <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => toggleSort("created_at")}>
                                                Date
                                                <ArrowUpDown className="ml-1 h-3 w-3" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            Delete
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredNotifs.map((notification, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">
                                                <Badge variant="outline">{notification.id}</Badge>
                                            </TableCell>
                                            <TableCell className="font-medium">{notification.title}</TableCell>
                                            <TableCell className="text-muted-foreground max-w-[200px] truncate">
                                                {notification.body}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <span>{notification.sender}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge>
                                                    {notification.receivers}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                                                    <span className="text-xs">{new Date(notification.created_at).toLocaleDateString()}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <ConfirmDelete type="notification" func={() => {handleDelete(notification.id)}} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
