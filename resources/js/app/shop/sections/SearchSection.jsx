import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function SearchSection({
    darkMode,
    search,
    onSearchChange,
    sort,
    onSortChange,
    saleOnly,
    onSaleOnlyChange,
}) {
    const [filtersOpen, setFiltersOpen] = useState(false);
    const fieldStyle = darkMode
        ? 'border-[#19382b] bg-[#0b2117] text-[#e2ece5] placeholder:text-[#779080] focus-within:border-[#55752a]'
        : 'border-[#dfe5da] bg-white text-slate-800 placeholder:text-slate-400 focus-within:border-[#b8c5b5]';

    return (
        <section className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <label className={`flex min-w-0 flex-1 items-center gap-2.5 rounded-full border px-3 py-2.5 transition focus-within:ring-2 focus-within:ring-[#d6f52f]/25 ${fieldStyle}`}>
                <Search className={`h-4 w-4 shrink-0 ${darkMode ? 'text-[#91aa9a]' : 'text-slate-400'}`} aria-hidden="true" />
                <input
                    type="search"
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Search paddles, shoes, brands..."
                    aria-label="Search shop products"
                    className="w-full border-0 bg-transparent p-0 text-sm focus:outline-none focus:ring-0"
                />
            </label>

            <div className="relative flex gap-2">
                <label className="sr-only" htmlFor="shop-sort">Sort products</label>
                <select
                    id="shop-sort"
                    value={sort}
                    onChange={(event) => onSortChange(event.target.value)}
                    className={`min-w-0 flex-1 rounded-xl border px-3 py-2 text-sm focus:border-[#d6f52f] focus:outline-none focus:ring-2 focus:ring-[#d6f52f]/20 sm:flex-none ${darkMode ? 'border-[#19382b] bg-[#0b2117] text-[#c2d2c8]' : 'border-[#dfe5da] bg-white text-slate-700'}`}
                >
                    <option value="popular">Most popular</option>
                    <option value="price-low">Price: low to high</option>
                    <option value="price-high">Price: high to low</option>
                    <option value="rating">Top rated</option>
                </select>
                <button
                    type="button"
                    onClick={() => setFiltersOpen((current) => !current)}
                    aria-expanded={filtersOpen}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition ${darkMode ? 'border-[#19382b] bg-[#0b2117] text-[#c2d2c8] hover:bg-[#102a1e]' : 'border-[#dfe5da] bg-white text-slate-700 hover:bg-slate-50'}`}
                >
                    <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                    Filters
                    {saleOnly && <span className="rounded-full bg-[#d6f52f] px-1.5 text-[10px] font-bold text-[#0b2117]">1</span>}
                </button>
                {filtersOpen && (
                    <label className={`absolute right-0 top-full z-20 mt-2 flex min-w-44 items-center gap-2 rounded-xl border p-3 text-xs shadow-lg ${darkMode ? 'border-[#254533] bg-[#0b2117] text-[#c2d2c8]' : 'border-[#dfe5da] bg-white text-slate-700'}`}>
                        <input
                            type="checkbox"
                            checked={saleOnly}
                            onChange={(event) => onSaleOnlyChange(event.target.checked)}
                            className="rounded border-slate-300 accent-[#b6d521] focus:ring-[#d6f52f]"
                        />
                        Sale items only
                    </label>
                )}
            </div>
        </section>
    );
}
