const CATEGORIES = ['All', 'Paddles', 'Balls', 'Shoes', 'Bags', 'Apparel', 'Accessories'];

export default function TabsSection({ darkMode, activeCategory, onCategoryChange }) {
    return (
        <nav aria-label="Product categories" className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
            {CATEGORIES.map((category) => {
                const active = activeCategory === category;
                return (
                    <button
                        key={category}
                        type="button"
                        onClick={() => onCategoryChange(category)}
                        aria-pressed={active}
                        className={[
                            'shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                            active
                                ? 'border-[#d6f52f] bg-[#d6f52f] text-[#0b2117]'
                                : darkMode
                                    ? 'border-[#19382b] bg-[#0b2117] text-[#c2d2c8] hover:bg-[#102a1e]'
                                    : 'border-[#dfe5da] bg-white text-slate-700 hover:bg-slate-50',
                        ].join(' ')}
                    >
                        {category}
                    </button>
                );
            })}
        </nav>
    );
}
