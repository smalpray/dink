import {
    BookOpenText,
    CalendarDays,
    LayoutGrid,
    MapPin,
    ShoppingBag,
    UserRound,
    BriefcaseBusiness,
    ShieldCheck,
} from 'lucide-react';

export const MAIN_NAV_ITEMS = [
    { name: 'Courts', href: '/courts', icon: MapPin },
    { name: 'Shop', href: '/shop', icon: ShoppingBag },
    { name: 'Events', href: '/events', icon: CalendarDays },
    { name: 'Bookings', href: '/bookings', icon: BookOpenText },
    { name: 'Profile', href: '/profile', icon: UserRound },
];

export const WORKSPACE_NAV_ITEMS = [
    { name: 'Owner view', href: '/owner-view', icon: LayoutGrid },
    { name: 'Staff overview', href: '/staff-overview', icon: BriefcaseBusiness },
    { name: 'Admin dashboard', href: '/admin/overview', icon: ShieldCheck },
];
