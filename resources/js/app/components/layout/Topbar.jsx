import { Link } from '@inertiajs/react';
import { MapPin, Search, SlidersHorizontal } from 'lucide-react';

const FILTERS = ['Available now', 'Indoor', 'Outdoor'];

export default function Topbar({
    title = 'Courts near you',
    subtitle = 'Near Fuente Osmeña Circle',
    darkMode = false,
}) {
    const palette = darkMode
        ? {
              header: 'border-[#19382b] bg-[#071b14]',
              location: 'border-[#254533] bg-[#0b2117] text-[#b8cdbf]',
              locationIcon: 'text-[#d6f52f]',
              heading: 'text-[#f2f6f3]',
              search: 'border-[#254533] bg-[#0b2117] text-[#dce9df] placeholder:text-[#779080] focus-within:border-[#55752a] focus-within:ring-[#d6f52f]/20',
              searchIcon: 'text-[#8aa394]',
              filter: 'border-[#254533] bg-[#0b2117] text-[#c2d2c8] hover:bg-[#102a1e]',
              filterIcon: 'text-[#a9bdaf]',
              activeFilter: 'border-[#d6f52f] bg-[#d6f52f] text-[#0b2117]',
          }
        : {
              header: 'border-[#e8e0d8] bg-[#f5f6f0]',
              location: 'border-[#dfe7e1] bg-white/80 text-slate-700',
              locationIcon: 'text-[#1b5d52]',
              heading: 'text-slate-900',
              search: 'border-[#dfe2dd] bg-white text-slate-700 placeholder:text-slate-400 focus-within:border-[#cfe0d9] focus-within:ring-[#d9efe5]',
              searchIcon: 'text-slate-400',
              filter: 'border-[#dfe3dd] bg-white text-slate-600 hover:bg-slate-50',
              filterIcon: 'text-slate-500',
              activeFilter: 'border-[#dfeae2] bg-[#edf6f2] text-[#1e5b52]',
          };

    return (
        <header className={`relative z-10 shrink-0 border-b px-4 pb-3 pt-5 transition-colors sm:px-5 lg:px-4 ${palette.header}`}>
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium shadow-sm ${palette.location}`}>
                            <MapPin className={`h-3.5 w-3.5 ${palette.locationIcon}`} />
                            {subtitle}
                        </span>
                    </div>

                    <Link
                        href="/profile"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0f3d33] text-sm font-semibold text-white shadow-sm ring-2 ring-white transition hover:bg-[#163f36]"
                        aria-label="Open profile"
                    >
                        A
                    </Link>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <h1 className={`text-3xl font-bold tracking-[-0.04em] sm:text-[2.1rem] lg:text-[1.7rem] ${palette.heading}`}>
                        {title}
                    </h1>
                </div>

                <div className="flex flex-col gap-2.5">
                    <label className={`flex w-full items-center gap-3 rounded-full border px-3.5 py-2.5 shadow-[0_1px_0_rgba(16,24,40,0.02)] transition focus-within:ring-2 ${palette.search}`}>
                        <Search className={`h-4 w-4 shrink-0 ${palette.searchIcon}`} />
                        <input
                            type="text"
                            placeholder="Search courts or neighborhoods"
                            className="w-full border-0 bg-transparent text-sm focus:outline-none"
                        />
                    </label>

                    <div className="flex items-center gap-2 self-start lg:self-auto">
                        <button
                            type="button"
                            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium shadow-sm transition ${palette.filter}`}
                        >
                            <SlidersHorizontal className={`h-4 w-4 ${palette.filterIcon}`} />
                            Filters
                        </button>
                    </div>
                </div>

                <div className="-mx-1 flex flex-nowrap items-center gap-2 overflow-x-auto px-1 pb-1">
                    {FILTERS.map((filter) => (
                        <button
                            key={filter}
                            type="button"
                            className={[
                                'shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition',
                                filter === 'Available now'
                                    ? palette.activeFilter
                                    : palette.filter,
                            ].join(' ')}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
}
