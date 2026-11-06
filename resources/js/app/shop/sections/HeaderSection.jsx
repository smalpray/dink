import { ArrowRight, Hand, Package, ShoppingCart } from 'lucide-react';

export default function HeaderSection({ darkMode, cartCount, onRent }) {
    return (
        <section>
            <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                    <h1 className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${darkMode ? 'text-[#eff5f0]' : 'text-slate-900'}`}>
                        Pro shop
                    </h1>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-[#91aa9a]' : 'text-slate-600'}`}>
                        Pre-order and pick up at your court, or get it delivered in Cebu.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Package className={`hidden h-4 w-4 sm:block ${darkMode ? 'text-[#91aa9a]' : 'text-slate-500'}`} aria-hidden="true" />
                    <button
                        type="button"
                        aria-label={`Shopping cart, ${cartCount} items`}
                        className={`relative flex h-10 w-10 items-center justify-center rounded-full border ${darkMode ? 'border-[#19382b] bg-[#0b2117] text-[#c2d2c8]' : 'border-slate-200 bg-white text-slate-600'}`}
                    >
                        <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                        {cartCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d6f52f] px-1 text-[10px] font-bold text-[#0b2117]">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            <button
                type="button"
                onClick={onRent}
                className={`group flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-colors sm:px-4 ${darkMode ? 'border-[#19382b] bg-[#0b2117] hover:bg-[#102a1e]' : 'border-[#dfe5da] bg-white hover:bg-[#f8faf6]'}`}
            >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d6f52f] text-[#0b2117]">
                    <Hand className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                    <span className={`block text-sm font-bold ${darkMode ? 'text-[#eff5f0]' : 'text-slate-900'}`}>
                        Rent gear for your next game
                    </span>
                    <span className={`mt-0.5 block text-xs ${darkMode ? 'text-[#91aa9a]' : 'text-slate-600'}`}>
                        Paddles from ₱150, ball sets, shoes and more — ready at the front desk.
                    </span>
                </span>
                <span className="hidden shrink-0 items-center gap-1 text-xs font-semibold text-[#d6f52f] sm:inline-flex">
                    Rent now <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
            </button>
        </section>
    );
}
