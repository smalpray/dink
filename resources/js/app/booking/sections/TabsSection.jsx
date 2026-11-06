export default function TabsSection({ darkMode, activeTab, counts, onTabChange }) {
    const tabs = ['Upcoming', 'Past'];

    return (
        <div
            role="tablist"
            aria-label="Booking history"
            className={`flex gap-5 border-b ${darkMode ? 'border-[#19382b]' : 'border-[#dfe5da]'}`}
        >
            {tabs.map((tab) => {
                const active = activeTab === tab;

                return (
                    <button
                        key={tab}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => onTabChange(tab)}
                        className={[
                            '-mb-px border-b-2 px-2.5 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d6f52f]',
                            active
                                ? 'border-[#d6f52f] text-[#d6f52f]'
                                : darkMode
                                  ? 'border-transparent text-[#8eaa99] hover:text-[#d5e5da]'
                                  : 'border-transparent text-slate-500 hover:text-slate-800',
                        ].join(' ')}
                    >
                        {tab} ({counts[tab]})
                    </button>
                );
            })}
        </div>
    );
}