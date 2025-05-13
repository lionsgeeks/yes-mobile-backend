import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {  Coins, HandCoins, LayoutGrid, Users, MicVocal } from 'lucide-react';
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
        title: 'Funders',
        url: '/funders',
        icon: Coins,
    },
    {
        title: 'Speakers',
        url: '/speakers',
        icon: MicVocal,
    },
]

const miscNavItems: NavItem[] = [
    {
        title: 'Sponsors',
        url: '/sponsors',
        icon: HandCoins,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
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

            <SidebarContent>
                <NavMain items={mainNavItems} />
                <NavMain items={accountNavItems} title='Accounts' />
                <NavMain items={miscNavItems} title='Others' />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
