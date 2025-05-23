import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import SponsorModal from './components/sponsorModal';
import { Building2, ExternalLink, Mail, MoreHorizontal, UserCircle } from 'lucide-react';
import ConfirmDelete from '@/components/confirm-delete';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar"


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

            <div className='p-6'>
                <div className='flex justify-end'>
                    <SponsorModal />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {sponsors.map((sponsor) => (
                        <div
                            key={sponsor.id}
                            className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-alpha/30"
                        >
                            <div
                                className={"absolute inset-0 h-1 bg-alpha"}
                            />
                            <div className="p-6 pt-8">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-16 w-16 rounded-md border">
                                            <AvatarImage src={'storage/' + sponsor.image} alt={sponsor.name} />
                                        </Avatar>
                                        <div>
                                            <h3 className="text-lg font-semibold">{sponsor.name}</h3>
                                            <Badge
                                                variant="outline"
                                                className={`mt-1
                                                ${sponsor.type === "media"
                                                        ? "border-alpha/50 bg-alpha/10 text-alpha hover:bg-alpha/20"
                                                        : sponsor.type === "technology"
                                                            ? "border-beta/50 bg-beta/10 text-beta hover:bg-beta/20"
                                                            : "border-green-500/30 bg-muted/30 text-green-500 hover:bg-muted/50"}
                                                `}
                                            >
                                                <span className='capitalize'>{sponsor.type}</span>
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-2'>

                                        <SponsorModal sponsor={sponsor} />


                                        <ConfirmDelete type="sponsor" func={() => { handleDelete(sponsor.id) }} />

                                    </div>
                                </div>

                                {sponsor.description && <p className="mt-4 text-sm text-muted-foreground line-clamp-3">{sponsor.description}</p>}

                                {
                                    sponsor.website && (
                                        <div className="mt-4 flex items-center">
                                            <a
                                                href={sponsor.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-sm text-alpha hover:underline"
                                            >
                                                Visit Website
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    )
}
