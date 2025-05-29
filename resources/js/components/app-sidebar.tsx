import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Coins, HandCoins, LayoutGrid, Users, MicVocal, Building2, Bug, MessageCircle, Calendar, Presentation } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
];

const accountNavItems: NavItem[] = [
    {
        title: 'Participants',
        url: '/participants',
        icon: Users,
    },
    {
        title: 'Speakers',
        url: '/speakers',
        icon: MicVocal,
    },
    {
        title: 'Moderators',
        url: '/moderators',
        icon: Presentation,
    },
]

const exhibitorNavItems: NavItem[] = [
    {
        title: 'Funders',
        url: '/funders',
        icon: Coins,
    },
    {
        title: 'NGOs',
        url: 'ngos',
        icon: Building2,
    },
]

const miscNavItems: NavItem[] = [
    {
        title: 'Sponsors',
        url: '/sponsors',
        icon: HandCoins,
    },
    {
        title: 'Programes',
        url: '/programe',
        icon: Calendar,
    },
    {
        title: 'Send Notifications',
        url: '/notifications',
        icon: MessageCircle,
    },
    {
        title: 'Reports',
        url: '/reporters',
        icon: Bug,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className='p-0'>
            <SidebarHeader className='bg-alpha'>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className='bg-alpha text-white'>
                <NavMain items={mainNavItems} />
                <NavMain items={accountNavItems} title='Accounts' />
                <NavMain items={exhibitorNavItems} title='Exhibitors' />
                <NavMain items={miscNavItems} title='Others' />
            </SidebarContent>

            <SidebarFooter className='bg-alpha'>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
