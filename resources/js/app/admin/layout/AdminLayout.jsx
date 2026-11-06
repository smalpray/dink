import { Head, Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { props } = usePage();
    const userName = props.auth?.user?.name || 'Admin';
    const initials = userName
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();

    return (
        <>
            <Head title="Admin - DinkZone" />
            <div className="min-h-screen bg-[#080e0b] text-slate-100 md:flex">
                <div className="fixed inset-y-0 left-0 z-30 hidden md:block">
                    <AdminSidebar />
                </div>

                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-50 md:hidden">
                        <button
                            type="button"
                            aria-label="Close admin navigation"
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        />
                        <div className="relative h-full w-72 max-w-[85vw]">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                aria-label="Close menu"
                                className="absolute right-3 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]"
                            >
                                <X className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <AdminSidebar onClose={() => setMobileMenuOpen(false)} />
                        </div>
                    </div>
                )}

                <div className="min-w-0 flex-1 md:pl-64">
                    <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-white/[0.07] bg-[#080e0b]/85 px-4 backdrop-blur-xl sm:px-7 lg:px-10">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(true)}
                                aria-label="Open admin navigation"
                                className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f] md:hidden"
                            >
                                <Menu className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a3bd3c]">Admin workspace</p>
                                <p className="hidden text-xs text-slate-600 sm:block">Good to see you, {userName}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                            <Link
                                href="/profile"
                                aria-label={`Open ${userName}'s profile`}
                                className="flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]"
                            >
                                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d6f52f]/20 bg-[#d6f52f]/10 text-xs font-bold text-[#e5ff55]">
                                    {initials}
                                </span>
                                <span className="hidden text-left sm:block">
                                    <span className="block max-w-32 truncate text-xs font-semibold text-slate-200">{userName}</span>
                                    <span className="block text-[10px] text-slate-600">Administrator</span>
                                </span>
                            </Link>
                        </div>
                    </header>

                    <main className="relative min-h-[calc(100vh-76px)] overflow-hidden px-4 py-7 sm:px-7 sm:py-9 lg:px-10">
                        <div className="pointer-events-none absolute -right-36 -top-40 h-96 w-96 rounded-full bg-[#d6f52f]/[0.035] blur-[100px]" />
                        <div className="pointer-events-none absolute -bottom-48 left-1/4 h-96 w-96 rounded-full bg-emerald-500/[0.04] blur-[100px]" />
                        <div className="relative z-10 mx-auto w-full max-w-[1440px]">{children}</div>
                    </main>
                </div>
            </div>
        </>
    );
}
