import { Head, useForm, usePage } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"


const breadcrumbs = [
    {
        title: 'General',
        href: '/general',
    },
];

export default function General() {
    const { general } = usePage().props
    const { data, setData, post } = useForm({
        version: general.version,
        token: general.token,
        playstore: general.playstore,
        appstore: general.appstore,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('general.update'))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="General" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">This is the General Info Table:</h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2 mt-5">
                    <div className="my-1">
                        <Label htmlFor="version">Version: </Label>
                        <Input type="text" name="version" id="version" placeholder="version"
                            value={data.version}
                            onChange={(e) => { setData('version', e.target.value) }}
                        />
                    </div>

                    <div className="my-1">
                        <Label htmlFor="token">Token: </Label>
                        <Input type="text" name="token" id="token" placeholder="token"
                            value={data.token}
                            onChange={(e) => { setData('token', e.target.value) }}
                        />
                    </div>

                    <div className="my-1">
                        <Label htmlFor="playstore">Play Store ID: </Label>
                        <Input type="text" name="playstore" id="playstore" placeholder="playstore"
                            value={data.playstore}
                            onChange={(e) => { setData('playstore', e.target.value) }}
                        />
                    </div>

                    <div className="my-1">
                        <Label htmlFor="appstore">App Store ID:</Label>
                        <Input type="text" name="appstore" id="appstore" placeholder="appstore"
                            value={data.appstore}
                            onChange={(e) => { setData('appstore', e.target.value) }}
                        />
                    </div>

                    <div className="col-span-2 flex justify-end">
                        <Button type="submit" className="w-[10vw]">
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    )
}
