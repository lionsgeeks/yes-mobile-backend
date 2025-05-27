import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Activity, Bell, Building, Building2, Calendar, ChevronRight, Clock, Coins, FileText, HandCoins, MessageSquare, Mic2, MicVocal, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppearance } from '@/hooks/use-appearance';
import { useEffect } from 'react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];


export default function Dashboard() {
      const { appearance, updateAppearance } = useAppearance();
        useEffect(() => {
    
            updateAppearance('light')
        }, [])
    const { participants, programCount } = usePage().props
    const stats = [
        {
            title: "Total Participants",
            value: participants?.length,
            change: "+18%",
            icon: Users,
            color: "alpha",
        },
        {
            title: "NGOs Registered",
            value: participants?.filter((p) => p.role == "ngo").length,
            change: "+5",
            icon: Building,
            color: "beta",
        },
        {
            title: "Speakers",
            value: participants?.filter((p) => p.role == "speaker").length,
            change: "3 pending",
            icon: Mic2,
            color: "alpha",
        },
        {
            title: "Funders",
            value: participants?.filter((p) => p.role == "funder").length,
            change: "",
            icon: HandCoins,
            color: "beta",
        },
        {
            title: "Program Sessions",
            value: programCount,
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


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Access frequently used pages with one click</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 grid-cols-2">
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

                    <Card className='pt-3 pb-0'>
                        <CardHeader>
                            <CardTitle>Recent Logins</CardTitle>
                            <CardDescription>Check who is using the application recently</CardDescription>
                        </CardHeader>

                        <CardContent className='p-0'>
                            {
                                participants?.slice(0, 5).map((participant, index) => (
                                    <div key={index} className={`${index % 2 == 0 ? 'bg-gray-100' : ''} mb-1 px-4 py-1`}>
                                        <div className='flex items-center gap-3 justify-between'>
                                            <h1 className='capitalize'>{participant.name}</h1>
                                            <p
                                            className={`${participant.role === 'funder' ? 'text-beta/80 bg-beta/20  border-beta' : participant.role === 'speaker' ? 'text-alpha/80 bg-alpha/20  border-alpha' : 'text-muted-foreground bg-gray-200/20'} text-sm border  px-1 rounded-full capitalize`}
                                            >{participant.role}</p>
                                        </div>
                                        <p className='text-sm text-muted-foreground'>{new Date(participant.updated_at).toLocaleString()}</p>
                                    </div>
                                ))
                            }
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
