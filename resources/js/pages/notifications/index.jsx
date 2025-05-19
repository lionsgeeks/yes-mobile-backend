import { Head, useForm, usePage } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const breadcrumbs = [
    {
        title: 'Send Notifications',
        href: '/notification',
    },
];
export default function Notifications() {
    const { notifs } = usePage().props;
    const { data, setData, post } = useForm({
        title: '',
        body: '',
    });

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />

            <div className="p-6">
                <form onSubmit={handleNotif} className="flex flex-col gap-3 w-[25vw]">
                    <Input type="text" name="title" id="title"
                        value={data.title} placeholder="Notification Title"
                        onChange={(e) => { setData('title', e.target.value) }}
                    />

                    <Input type="text" name="body" id="body"
                        value={data.body} placeholder="Notification Body"
                        onChange={(e) => { setData('body', e.target.value) }}
                    />

                    <Button type="submit">
                        Send Notification
                    </Button>
                </form>


                <div>
                    <h1>Sent Notifications</h1>
                    {
                        notifs.map((notif, ind) => (
                            <div key={ind}>
                                <p>id {notif.id}</p>
                                <p>title {notif.title}</p>
                                <p>body {notif.body}</p>
                                <p>sender {notif.sender}</p>
                                <p>receivers {notif.receivers}</p>
                                <hr />
                            </div>
                        ))
                    }
                </div>
            </div>
        </AppLayout>
    )
}
