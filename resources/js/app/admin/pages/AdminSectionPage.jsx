import { Head, Link } from '@inertiajs/react';
import {
    ArrowDownRight,
    ArrowRight,
    ArrowUpRight,
    CalendarClock,
    Check,
    ChevronDown,
    CircleDollarSign,
    ClipboardList,
    Download,
    FileWarning,
    FolderOpen,
    LayoutDashboard,
    MapPinned,
    Package,
    Search,
    UsersRound,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useGetAdminSectionQuery } from '../../../features/admin/adminApi';
import { ADMIN_NAV_ITEMS } from '../../../features/admin/adminData';

const STAT_ICONS = {
    revenue: CircleDollarSign,
    bookings: ClipboardList,
    players: UsersRound,
    occupancy: CalendarClock,
    venues: MapPinned,
    courts: LayoutDashboard,
    attention: FileWarning,
    calendar: CalendarClock,
    rating: ArrowUpRight,
    products: Package,
    staff: UsersRound,
};

const STATUS_COLORS = {
    Confirmed: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
    Active: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
    Open: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
    'Top venue': 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
    Pending: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
    'Opening soon': 'border-amber-400/20 bg-amber-400/10 text-amber-300',
    'Low stock': 'border-amber-400/20 bg-amber-400/10 text-amber-300',
    Growing: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
    Cancelled: 'border-rose-400/20 bg-rose-400/10 text-rose-300',
    'Out of stock': 'border-rose-400/20 bg-rose-400/10 text-rose-300',
    Maintenance: 'border-rose-400/20 bg-rose-400/10 text-rose-300',
    Invited: 'border-sky-400/20 bg-sky-400/10 text-sky-300',
    'Registration open': 'border-sky-400/20 bg-sky-400/10 text-sky-300',
    Completed: 'border-white/10 bg-white/[0.05] text-slate-400',
    Steady: 'border-white/10 bg-white/[0.05] text-slate-400',
};

function LoadingPanel() {
    return (
        <div className="space-y-6" aria-label="Loading admin data" role="status">
            <div className="h-8 w-56 animate-pulse rounded-xl bg-white/[0.07]" />
            <div className="h-4 w-80 max-w-full animate-pulse rounded-lg bg-white/[0.05]" />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="h-36 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.025]" />
                ))}
            </div>
            <div className="h-72 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.025]" />
        </div>
    );
}

function EmptyState({ searching, onClear }) {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.03]">
                <FolderOpen className="h-6 w-6 text-slate-600" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-sm font-semibold text-slate-200">
                {searching ? 'No matching records' : 'Nothing to show yet'}
            </h3>
            <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
                {searching ? 'Try another search or clear the current filter.' : 'Records will appear here when they are available.'}
            </p>
            {searching && (
                <button
                    type="button"
                    onClick={onClear}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/[0.1] px-4 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]"
                >
                    Clear filters <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
            )}
            {!searching && (
                <Link
                    href="/admin/overview"
                    className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/[0.1] px-4 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]"
                >
                    Back to overview <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
            )}
        </div>
    );
}

function MetricCard({ stat }) {
    const Icon = STAT_ICONS[stat.icon] || LayoutDashboard;
    const negative = stat.trend.startsWith('-');
    const TrendIcon = negative ? ArrowDownRight : ArrowUpRight;

    return (
        <article className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.055] to-white/[0.018] p-5 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#d6f52f]/20 sm:p-6">
            <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-[#d6f52f]/[0.055] blur-3xl transition-opacity group-hover:opacity-100" />
            <div className="relative flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                    <p className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[1.7rem]">{stat.value}</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d6f52f]/10 bg-[#d6f52f]/[0.06] text-[#d6f52f]">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
            </div>
            <div className="relative mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px]">
                <span className={negative ? 'inline-flex items-center gap-0.5 font-semibold text-rose-300' : 'inline-flex items-center gap-0.5 font-semibold text-emerald-300'}>
                    <TrendIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    {stat.trend}
                </span>
                <span className="text-slate-600">{stat.note}</span>
            </div>
        </article>
    );
}

function RevenuePanel({ section }) {
    const maxValue = Math.max(...section.revenue);

    return (
        <section className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-white/[0.015] p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold text-slate-100">Revenue overview</p>
                    <p className="mt-1 text-xs text-slate-500">Monthly gross revenue · 2026</p>
                </div>
                <span className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/[0.08] px-3 text-xs font-medium text-slate-400">
                    This year <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
            </div>
            <div className="mt-7 flex h-44 items-end gap-2 sm:gap-3" aria-label="Monthly revenue bar chart">
                {section.revenue.map((value, index) => (
                    <div key={section.revenueLabels[index]} className="group/bar flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
                        <div className="relative w-full flex-1">
                            <div
                                title={`${section.revenueLabels[index]}: ${value}% of peak`}
                                className={[
                                    'absolute inset-x-0 bottom-0 rounded-t-md transition-[background-color,box-shadow] duration-200',
                                    index === 10 ? 'bg-[#d6f52f] shadow-[0_0_18px_rgba(214,245,47,0.22)]' : 'bg-white/[0.08] group-hover/bar:bg-[#d6f52f]/45',
                                ].join(' ')}
                                style={{ height: `${Math.max((value / maxValue) * 100, 8)}%` }}
                            />
                        </div>
                        <span className="text-[9px] text-slate-600 sm:text-[10px]">{section.revenueLabels[index]}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

function RecordTable({ rows, searching, onClear }) {
    return (
        <div className="overflow-x-auto">
            {rows.length ? (
                <table className="w-full min-w-[680px] text-left">
                    <thead>
                        <tr className="border-b border-white/[0.06]">
                            <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600 sm:px-6">Name</th>
                            <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">Details</th>
                            <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">Date / info</th>
                            <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">Value</th>
                            <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.045]">
                        {rows.map((row) => (
                            <tr key={`${row.name}-${row.date}`} className="group transition-colors hover:bg-white/[0.025]">
                                <td className="px-5 py-4 text-xs font-medium text-slate-200 sm:px-6">{row.name}</td>
                                <td className="px-5 py-4 text-xs text-slate-500">{row.detail}</td>
                                <td className="px-5 py-4 text-xs text-slate-400">{row.date}</td>
                                <td className="px-5 py-4 text-xs font-medium text-slate-300">{row.amount}</td>
                                <td className="px-5 py-4">
                                    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-medium ${STATUS_COLORS[row.status] || 'border-white/10 bg-white/[0.04] text-slate-400'}`}>
                                        <span className="h-1 w-1 rounded-full bg-current" aria-hidden="true" />
                                        {row.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <EmptyState searching={searching} onClear={onClear} />
            )}
        </div>
    );
}

function CalendarStrip() {
    const days = [
        { name: 'Mon', date: '02', count: '6 bookings' },
        { name: 'Tue', date: '03', count: '8 bookings' },
        { name: 'Wed', date: '04', count: '5 bookings' },
        { name: 'Thu', date: '05', count: '9 bookings' },
        { name: 'Fri', date: '06', count: '7 bookings' },
        { name: 'Sat', date: '07', count: '18 bookings' },
        { name: 'Sun', date: '08', count: '14 bookings' },
    ];

    return (
        <section className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-white/[0.015] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-sm font-semibold text-slate-100">This week</h2>
                    <p className="mt-1 text-xs text-slate-500">November 2 – 8, 2026</p>
                </div>
                <span className="flex h-10 items-center gap-2 rounded-xl border border-white/[0.08] px-3 text-xs font-medium text-slate-400">
                    <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" /> Week
                </span>
            </div>
            <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-7">
                {days.map((day) => (
                    <div key={day.name} className={`rounded-xl border p-3 text-center sm:px-2 ${day.date === '03' ? 'border-[#d6f52f]/25 bg-[#d6f52f]/[0.08]' : 'border-white/[0.05] bg-white/[0.02]'}`}>
                        <p className="text-[10px] font-medium text-slate-500">{day.name}</p>
                        <p className={`mt-2 text-lg font-semibold ${day.date === '03' ? 'text-[#e5ff55]' : 'text-slate-200'}`}>{day.date}</p>
                        <p className="mt-1 hidden text-[9px] text-slate-600 sm:block">{day.count}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default function AdminSectionPage({ section }) {
    const { data, isLoading, isError, refetch } = useGetAdminSectionQuery({ section });
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [notice, setNotice] = useState('');
    const [page, setPage] = useState(1);
    const activeNav = ADMIN_NAV_ITEMS.find((item) => item.section === section);

    useEffect(() => {
        setSearch('');
        setStatusFilter('All');
        setNotice('');
        setPage(1);
    }, [section]);

    const filteredRows = useMemo(() => {
        const rows = data?.rows || [];
        return rows.filter((row) => {
            const matchesSearch = `${row.name} ${row.detail} ${row.date} ${row.amount} ${row.status}`
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchesStatus = statusFilter === 'All' || row.status.toLowerCase().includes(statusFilter.toLowerCase());

            return matchesSearch && matchesStatus;
        });
    }, [data, search, statusFilter]);
    const pageSize = 5;
    const pageCount = Math.max(1, Math.ceil(filteredRows.length / pageSize));
    const visibleRows = filteredRows.slice((page - 1) * pageSize, page * pageSize);

    if (isLoading) {
        return <LoadingPanel />;
    }

    if (isError || !data) {
        return (
            <section className="rounded-2xl border border-rose-400/15 bg-rose-400/[0.04] p-8 text-center">
                <FileWarning className="mx-auto h-8 w-8 text-rose-300" aria-hidden="true" />
                <h1 className="mt-4 text-base font-semibold text-white">We couldn’t load this section</h1>
                <p className="mt-2 text-sm text-slate-500">Please try again. Demo data is available locally in this workspace.</p>
                <button type="button" onClick={refetch} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#d6f52f] px-4 text-sm font-semibold text-[#14200f] hover:bg-[#e3ff45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                    Try again <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
            </section>
        );
    }

    const action = () => {
        setNotice('Demo mode: this control does not change live records.');
        window.setTimeout(() => setNotice(''), 3500);
    };

    return (
        <>
            <Head title={`${data.title} - Admin - DinkZone`} />
            <div className="flex flex-col gap-7">
                <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                            <Link href="/admin/overview" className="transition-colors hover:text-slate-300">Admin</Link>
                            <span aria-hidden="true">/</span>
                            <span className="text-[#a3bd3c]">{activeNav?.label || data.title}</span>
                        </div>
                        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{data.title}</h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{data.description}</p>
                    </div>
                    <button
                        type="button"
                        onClick={action}
                        className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl bg-[#d6f52f] px-4 text-xs font-semibold text-[#15220d] shadow-[0_0_22px_rgba(214,245,47,0.13)] transition-[background,box-shadow,transform] hover:-translate-y-0.5 hover:bg-[#e3ff45] hover:shadow-[0_0_28px_rgba(214,245,47,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:self-auto"
                    >
                        {data.action.toLowerCase().includes('export') || data.action.toLowerCase().includes('download')
                            ? <Download className="h-4 w-4" aria-hidden="true" />
                            : <span className="text-base leading-none" aria-hidden="true">+</span>}
                        {data.action}
                    </button>
                </section>

                {notice && (
                    <p role="status" className="rounded-xl border border-[#d6f52f]/15 bg-[#d6f52f]/[0.06] px-4 py-3 text-xs text-[#e5ff55]">
                        {notice}
                    </p>
                )}

                <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {data.stats.map((stat) => <MetricCard key={stat.label} stat={stat} />)}
                </section>

                {section === 'calendar' && <CalendarStrip />}
                {data.revenue && <RevenuePanel section={data} />}

                <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.035] to-white/[0.012]">
                    <div className="flex flex-col gap-4 border-b border-white/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                            <h2 className="text-sm font-semibold text-slate-100">
                                {section === 'overview' ? 'Recent bookings' : section === 'reports' ? 'Venue performance' : data.title}
                            </h2>
                            <p className="mt-1 text-xs text-slate-600">Showing demo records for this workspace</p>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            {section === 'bookings' && (
                                <div className="flex items-center gap-1 overflow-x-auto rounded-xl border border-white/[0.07] bg-black/10 p-1" aria-label="Filter bookings by status">
                                    {['All', 'Confirmed', 'Pending', 'Cancelled'].map((status) => (
                                        <button
                                            key={status}
                                            type="button"
                                            onClick={() => {
                                                setStatusFilter(status);
                                                setPage(1);
                                            }}
                                            aria-pressed={statusFilter === status}
                                            className={`min-h-9 shrink-0 rounded-lg px-2.5 text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f] ${statusFilter === status ? 'bg-white/[0.09] text-white' : 'text-slate-500 hover:text-slate-200'}`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <label className="flex min-h-10 items-center gap-2 rounded-xl border border-white/[0.07] bg-black/10 px-3 focus-within:border-[#d6f52f]/30 focus-within:ring-2 focus-within:ring-[#d6f52f]/10">
                                <Search className="h-3.5 w-3.5 shrink-0 text-slate-600" aria-hidden="true" />
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(event) => {
                                        setSearch(event.target.value);
                                        setPage(1);
                                    }}
                                    placeholder="Search records"
                                    aria-label="Search records"
                                    className="w-full min-w-28 border-0 bg-transparent p-0 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-0 sm:w-36"
                                />
                            </label>
                        </div>
                    </div>
                    <RecordTable
                        rows={visibleRows}
                        searching={Boolean(search || statusFilter !== 'All')}
                        onClear={() => {
                            setSearch('');
                            setStatusFilter('All');
                            setPage(1);
                        }}
                    />
                    <div className="flex flex-col gap-3 border-t border-white/[0.06] px-5 py-3.5 text-[10px] text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <span>
                            {filteredRows.length
                                ? `Showing ${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, filteredRows.length)} of ${filteredRows.length} records`
                                : 'Showing 0 records'}
                        </span>
                        <nav aria-label="Record pages" className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={page === 1}
                                onClick={() => setPage((current) => Math.max(1, current - 1))}
                                className="min-h-9 rounded-lg border border-white/[0.07] px-3 text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Previous
                            </button>
                            <span aria-live="polite" className="min-w-16 text-center text-slate-500">Page {page} of {pageCount}</span>
                            <button
                                type="button"
                                disabled={page >= pageCount}
                                onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                                className="min-h-9 rounded-lg border border-white/[0.07] px-3 text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                </section>

                <div className="flex items-center gap-2 text-[10px] text-slate-700">
                    <Check className="h-3 w-3 text-[#a3bd3c]" aria-hidden="true" />
                    Preview data only · Changes are not saved
                </div>
            </div>
        </>
    );
}
