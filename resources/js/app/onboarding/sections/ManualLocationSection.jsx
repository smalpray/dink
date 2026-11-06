const locations = [
    { name: 'Fuerte Osmeña Circle', suburb: 'Cebu City center', selected: true },
    { name: 'Cebu IT Park', suburb: 'Lahug', selected: false },
    { name: 'Ayala Center Cebu', suburb: 'Cebu Business Park', selected: false },
    { name: 'SM City Cebu', suburb: 'North Reclamation', selected: false },
    { name: 'SM Seaside City', suburb: 'South Road Properties', selected: false },
    { name: 'Banilad Town Centre', suburb: 'Banilad', selected: false },
    { name: 'USC Talamban Campus', suburb: 'Talamban', selected: false },
    { name: 'Cebu Provincial Capitol', suburb: 'Capitol Site', selected: false },
    { name: 'Colon Street', suburb: 'Downtown', selected: false },
    { name: 'Guadalupe Church', suburb: 'Guadalupe', selected: false },
    { name: 'Mabolo Church', suburb: 'Mabolo', selected: false },
];

export default function ManualLocationSection({ onClose, onSelect }) {
    return (
        <div className="absolute inset-y-0 right-0 z-20 w-[440px] border-l border-slate-200 bg-[#f4f2ef] shadow-[0_0_35px_rgba(15,23,42,0.12)]">
            <div className="flex h-full flex-col px-5 pt-5">
                <div className="flex items-center justify-between pb-4">
                    <h3 className="text-[1.05rem] font-semibold text-[#0f172a]">Set your location</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-slate-600 hover:bg-slate-200/80"
                        aria-label="Close location picker"
                    >
                        ×
                    </button>
                </div>

                <p className="pb-4 text-sm text-slate-500">We sort courts by distance from here.</p>

                <button
                    type="button"
                    onClick={onSelect}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-3 text-left shadow-sm"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0d4a45] text-white">
                            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                                <path d="M4.9 9.9A7.1 7.1 0 0 1 18.1 9.9c0 5.1-7.1 11.3-7.1 11.3S4.9 15 4.9 9.9Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="9.8" r="2.5" stroke="currentColor" strokeWidth="1.8" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-slate-800">Use my current location</div>
                            <div className="text-xs text-slate-500">Most accurate — updates as you move</div>
                        </div>
                    </div>
                </button>

                <div className="mt-4 rounded-xl border border-slate-200 bg-[#f2f0ed] p-2">
                    <input
                        type="text"
                        aria-label="Search a place or neighborhood"
                        placeholder="Search a place or neighborhood"
                        className="w-full border-0 bg-transparent px-2 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-0"
                    />
                </div>

                <div className="mt-4 flex-1 overflow-y-auto pr-1">
                    {locations.map((location) => (
                        <button
                            key={location.name}
                            type="button"
                            onClick={onSelect}
                            className="flex w-full items-center justify-between rounded-xl border border-transparent px-2 py-3 text-left transition hover:bg-white/80"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-slate-500">
                                    <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
                                        <path d="M12 20.5c4.4-2.3 7-5.6 7-9.4A4.6 4.6 0 0 0 14.4 6 4.8 4.8 0 0 0 12 7.5 4.8 4.8 0 0 0 9.6 6 4.6 4.6 0 0 0 5 11.1c0 3.8 2.6 7.1 7 9.4Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[0.98rem] font-medium text-slate-800">{location.name}</div>
                                    <div className="text-xs text-slate-500">{location.suburb}</div>
                                </div>
                            </div>

                            {location.selected && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0d4a45] text-white">
                                    <svg viewBox="0 0 20 20" fill="none" className="h-3 w-3" aria-hidden="true">
                                        <path d="m5 10.2 2.9 2.9 6.7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
