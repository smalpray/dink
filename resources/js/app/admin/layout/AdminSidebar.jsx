import { Link, usePage } from '@inertiajs/react';
import {
    Activity,
    ArrowUpRight,
    CalendarDays,
    ChartNoAxesCombined,
    CircleDollarSign,
    ClipboardList,
    LayoutDashboard,
    MapPinned,
    Package,
    ShieldCheck,
    Trophy,
    UsersRound,
} from 'lucide-react';
import { ADMIN_NAV_ITEMS } from '../../../features/admin/adminData';

const icons = {
    overview: LayoutDashboard,
    owner: CircleDollarSign,
    bookings: ClipboardList,
    calendar: CalendarDays,
    venues: MapPinned,
    tournaments: Trophy,
    shop: Package,
    users: UsersRound,
    reports: ChartNoAxesCombined,
};

export default function AdminSidebar({ onClose }) {
    const { url } = usePage();

    return (
        <aside className="flex h-full w-72 flex-col border-r border-white/[0.07] bg-[#0b120f] text-slate-300 md:w-64">
            <div className="flex h-[76px] shrink-0 items-center gap-3 border-b border-white/[0.07] px-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#d6f52f] text-[#122013] shadow-[0_0_24px_rgba(214,245,47,0.18)]">
                    <Activity className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                    <p className="text-base font-bold tracking-tight text-white">DinkZone</p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Control center</p>
                </div>
            </div>

            <nav aria-label="Admin navigation" className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
                <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                    Workspace
                </p>
                {ADMIN_NAV_ITEMS.map((item) => {
                    const Icon = icons[item.icon];
                    const active = url.split('?')[0] === item.href;

                    return (
                        <Link
                            key={item.section}
                            href={item.href}
                            onClick={onClose}
                            aria-current={active ? 'page' : undefined}
                            className={[
                                'group flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-[background,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]',
                                active
                                    ? 'border border-[#d6f52f]/20 bg-[#d6f52f]/10 text-[#e5ff55] shadow-[0_0_24px_rgba(214,245,47,0.07)]'
                                    : 'border border-transparent text-slate-500 hover:bg-white/[0.04] hover:text-slate-100',
                            ].join(' ')}
                        >
                            <Icon className={['h-4 w-4 shrink-0', active ? 'text-[#d6f52f]' : 'text-slate-600 group-hover:text-slate-300'].join(' ')} aria-hidden="true" />
                            <span className="truncate">{item.label}</span>
                            {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#d6f52f]" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-white/[0.07] p-4">
                <Link
                    href="/courts"
                    onClick={onClose}
                    className="flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 text-sm font-medium text-slate-500 transition-colors hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]"
                >
                    <span className="flex items-center gap-3">
                        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                        Player experience
                    </span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
            </div>
        </aside>
    );
}
