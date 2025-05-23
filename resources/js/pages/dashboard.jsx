import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Activity, Bell, Building, Building2, Calendar, ChevronRight, Clock, Coins, FileText, HandCoins, MessageSquare, Mic2, MicVocal, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];


export default function Dashboard() {
    const stats = [
        {
            title: "Total Participants",
            value: "245",
            change: "+18%",
            icon: Users,
            color: "alpha",
        },
        {
            title: "NGOs Registered",
            value: "32",
            change: "+5",
            icon: Building,
            color: "beta",
        },
        {
            title: "Speakers",
            value: "18",
            change: "3 pending",
            icon: Mic2,
            color: "alpha",
        },
        {
            title: "Sponsors & Funders",
            value: "12",
            change: "",
            icon: HandCoins,
            color: "beta",
        },
        {
            title: "Program Sessions",
            value: "24",
            change: "2 days",
            icon: Calendar,
            color: "alpha",
        }
    ]
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    {stats.map((stat, index) => (
                        <Card
                            key={index}
                            className=
                            {`${stat.color === "alpha" ? "hover:border-alpha/30" : "hover:border-beta/30"} overflow-hidden transition-all hover:shadow-md p-0`}
                        >
                            <CardContent
                                className=
                                {`${stat.color === "alpha" ? "bg-alpha/5 dark:bg-alpha/10" : "bg-beta/5 dark:bg-beta/10"} py-4`}
                            >
                                <div className='flex justify-between'>
                                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                    <stat.icon className={`${stat.color === "alpha" ? "text-alpha" : "text-beta"} h-4 w-4`} />
                                </div>
                                <div className="text-2xl font-bold mt-4">
                                    <p className=''>{stat.value}</p>
                                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>


                <div className="">
                    <Card className="">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Access frequently used pages with one click</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                            <a href="/participants">
                                <div className="flex items-center gap-3 rounded-lg border p-3 text-sm transition-colors hover:bg-accent">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-alpha/10">
                                        <Users className="h-5 w-5 text-alpha" />
                                    </div>
                                    <div className="font-medium">Participants</div>
                                    <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                                </div>
                            </a>
                            <a href="/funders">
                                <div className="flex items-center gap-3 rounded-lg border p-3 text-sm transition-colors hover:bg-accent">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-alpha/10">
                                        <Coins className="h-5 w-5 text-alpha" />
                                    </div>
                                    <div className="font-medium">Funders</div>
                                    <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                                </div>
                            </a>
                            <a href="/ngos">
                                <div className="flex items-center gap-3 rounded-lg border p-3 text-sm transition-colors hover:bg-accent">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-alpha/10">
                                        <Building2 className="h-5 w-5 text-alpha" />
                                    </div>
                                    <div className="font-medium">NGOs</div>
                                    <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                                </div>
                            </a>
                            <a href="/speakers">
                                <div className="flex items-center gap-3 rounded-lg border p-3 text-sm transition-colors hover:bg-accent">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-alpha/10">
                                        <MicVocal className="h-5 w-5 text-alpha" />
                                    </div>
                                    <div className="font-medium">Speakers</div>
                                    <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                                </div>
                            </a>
                            <a href="/sponsors">
                                <div className="flex items-center gap-3 rounded-lg border p-3 text-sm transition-colors hover:bg-accent">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-alpha/10">
                                        <HandCoins className="h-5 w-5 text-alpha" />
                                    </div>
                                    <div className="font-medium">Sponsors</div>
                                    <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                                </div>
                            </a>
                            <a href="/programe">
                                <div className="flex items-center gap-3 rounded-lg border p-3 text-sm transition-colors hover:bg-accent">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-alpha/10">
                                        <Calendar className="h-5 w-5 text-alpha" />
                                    </div>
                                    <div className="font-medium">Programmes</div>
                                    <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                                </div>
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
