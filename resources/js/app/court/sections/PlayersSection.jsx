import { Minus, Plus, Hand, Circle, CupSoda } from 'lucide-react';

const ADD_ONS = [
    { key: 'paddle', name: 'Paddle rental', description: 'Graphite paddle, per player', price: 150, icon: Hand },
    { key: 'balls', name: 'Ball pack', description: '3 Franklin X-40 outdoor balls', price: 180, icon: Circle },
    { key: 'water', name: 'Cold water', description: '500 ml bottle', price: 40, icon: CupSoda },
];

export default function PlayersSection({
    darkMode,
    playerCount,
    onPlayerCountChange,
    addOns,
    onAddOnChange,
}) {
    const panel = darkMode ? 'border-[#19382b] bg-[#0b2117]' : 'border-[#dfe5da] bg-white';
    const inset = darkMode ? 'bg-[#102a1e]' : 'bg-[#f0f5ef]';
    const heading = darkMode ? 'text-[#edf4ef]' : 'text-slate-900';
    const muted = darkMode ? 'text-[#8eaa99]' : 'text-slate-500';

    return (
        <section aria-labelledby="players-heading" className="flex flex-col gap-3">
            <h2 id="players-heading" className={`text-lg font-bold ${heading}`}>
                Players &amp; add-ons
            </h2>

            <div className={`rounded-2xl border p-3.5 ${panel}`}>
                <h3 className={`text-xs font-semibold ${heading}`}>How many players?</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                    {[2, 3, 4].map((count) => (
                        <button
                            key={count}
                            type="button"
                            onClick={() => onPlayerCountChange(count)}
                            aria-pressed={playerCount === count}
                            className={[
                                'min-h-11 rounded-full border px-4 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]',
                                playerCount === count
                                    ? 'border-[#d6f52f] bg-[#d6f52f] text-[#0b2117]'
                                    : `${darkMode ? 'border-[#19382b] text-[#d7e4dc] hover:bg-[#102a1e]' : 'border-[#dfe5da] text-slate-700 hover:bg-[#f0f5ef]'}`,
                            ].join(' ')}
                        >
                            {count} players
                        </button>
                    ))}
                </div>
                <p className={`mt-2 text-[10px] ${muted}`}>
                    Up to 4 per court. Everyone gets the same QR pass.
                </p>
            </div>

            <div className={`divide-y overflow-hidden rounded-2xl border ${panel} ${darkMode ? 'divide-[#19382b]' : 'divide-[#e6ebe3]'}`}>
                {ADD_ONS.map((addOn) => {
                    const Icon = addOn.icon;
                    const quantity = addOns[addOn.key];

                    return (
                        <div key={addOn.key} className="flex items-center justify-between gap-3 px-3.5 py-3">
                            <div className="flex min-w-0 items-center gap-2.5">
                                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${inset}`}>
                                    <Icon className={`h-4 w-4 ${muted}`} aria-hidden="true" />
                                </span>
                                <div className="min-w-0">
                                    <h3 className={`truncate text-xs font-semibold ${heading}`}>{addOn.name}</h3>
                                    <p className={`text-[10px] ${muted}`}>
                                        {addOn.description} · ₱{addOn.price}
                                    </p>
                                </div>
                            </div>

                            <div className={`flex h-10 shrink-0 items-center gap-1 rounded-full border px-1 ${darkMode ? 'border-[#19382b]' : 'border-[#dfe5da]'}`}>
                                <button
                                    type="button"
                                    onClick={() => onAddOnChange(addOn.key, Math.max(0, quantity - 1))}
                                    disabled={quantity === 0}
                                    aria-label={`Remove one ${addOn.name}`}
                                    className={`flex h-9 w-9 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f] disabled:opacity-40 ${muted}`}
                                >
                                    <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                                </button>
                                <span aria-live="polite" className={`w-5 text-center text-xs font-semibold ${heading}`}>
                                    {quantity}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => onAddOnChange(addOn.key, quantity + 1)}
                                    aria-label={`Add one ${addOn.name}`}
                                    className={`flex h-9 w-9 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f] ${muted}`}
                                >
                                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
