import { useMemo, useState } from 'react';
import Button from '@/app/components/Button';
import Badge from '@/app/components/Badge';
import {
    ArrowLeft,
    Circle,
    Hand,
    LockKeyhole,
    Minus,
    Plus,
    Shirt,
    Sparkles,
    Footprints,
} from 'lucide-react';

const BOOKINGS = [
    { id: 'kitchen', name: 'The Kitchen at IT Park', detail: 'Tue, Nov 3 · 7 PM – 8 PM · Court 3' },
    { id: 'ayala', name: 'Ayala Skycourt', detail: 'Fri, Nov 6 · 5 PM – 7 PM · Court 2' },
];

const GEAR = [
    { id: 'standard', name: 'Standard paddle', detail: 'Graphite, per session', price: 150, available: 13, icon: Hand },
    { id: 'premium', name: 'Premium paddle', detail: 'Carbon fiber, per session', price: 300, available: 5, icon: Sparkles },
    { id: 'balls', name: 'Ball set', detail: '3 indoor balls, per session', price: 80, available: 23, icon: Circle },
    { id: 'shoes', name: 'Court shoes', detail: 'Sizes 6–12, per session', price: 200, available: 9, icon: Footprints },
    { id: 'towel', name: 'Towel', detail: 'Freshly laundered', price: 50, available: 33, icon: Shirt },
    { id: 'locker', name: 'Locker', detail: 'Keyed, per visit', price: 60, available: 9, icon: LockKeyhole },
];

const INITIAL_RENTALS = [
    {
        booking: 'The Kitchen at IT Park',
        detail: 'Tue, Nov 3 · 7 PM – 8 PM · Court 3',
        items: ['2× Standard paddle', '1× Ball set'],
        code: 'RN-7K2P',
        total: 380,
        status: 'Picked up',
    },
];

export default function RentSection({ darkMode, onBack }) {
    const [bookingId, setBookingId] = useState(BOOKINGS[0].id);
    const [quantities, setQuantities] = useState({});
    const [rentals, setRentals] = useState(INITIAL_RENTALS);
    const [rentalTab, setRentalTab] = useState('Active');
    const [message, setMessage] = useState('');

    const selectedBooking = BOOKINGS.find((booking) => booking.id === bookingId);
    const total = useMemo(
        () => GEAR.reduce((sum, item) => sum + item.price * (quantities[item.id] || 0), 0),
        [quantities],
    );
    const selectedItems = GEAR.filter((item) => quantities[item.id] > 0);

    const changeQuantity = (item, delta) => {
        setMessage('');
        setQuantities((current) => {
            const next = Math.min(
                item.available,
                Math.max(0, (current[item.id] || 0) + delta),
            );
            return { ...current, [item.id]: next };
        });
    };

    const reserveGear = () => {
        if (selectedItems.length === 0) {
            setMessage('Choose at least one gear item to reserve.');
            return;
        }

        const code = `RN-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
        setRentals((current) => [
            {
                booking: selectedBooking.name,
                detail: selectedBooking.detail,
                items: selectedItems.map((item) => `${quantities[item.id]}× ${item.name}`),
                code,
                total,
                status: 'Reserved',
            },
            ...current,
        ]);
        setQuantities({});
        setRentalTab('Active');
        setMessage(`Gear reserved. Your pickup code is ${code}.`);
    };

    const surface = darkMode
        ? 'border-[#19382b] bg-[#0b2117]'
        : 'border-[#dfe5da] bg-white';
    const heading = darkMode ? 'text-[#eff5f0]' : 'text-slate-900';
    const muted = darkMode ? 'text-[#91aa9a]' : 'text-slate-600';

    return (
        <div className={`min-h-full ${darkMode ? 'text-[#e4eee7]' : 'text-slate-900'}`}>
            <header className="mb-5 flex items-start gap-3">
                <button
                    type="button"
                    onClick={onBack}
                    aria-label="Back to shop"
                    className={`mt-1 rounded-full p-1.5 transition ${darkMode ? 'text-[#c2d2c8] hover:bg-[#102a1e]' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                    <ArrowLeft className="h-4 w-4" />
                </button>
                <div>
                    <h1 className={`text-2xl font-extrabold tracking-tight ${heading}`}>Rent gear</h1>
                    <p className={`mt-1 text-xs sm:text-sm ${muted}`}>
                        Reserve paddles, balls and more for your booking. Pick up at the front desk, pay at pickup.
                    </p>
                </div>
            </header>

            {message && (
                <p role="status" className={`mb-4 rounded-xl border px-3 py-2 text-xs ${message.startsWith('Choose') ? 'border-amber-500/30 bg-amber-500/10 text-amber-700' : 'border-[#d6f52f]/30 bg-[#d6f52f]/10 text-[#a2bd20]'}`}>
                    {message}
                </p>
            )}

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_255px]">
                <div className="min-w-0">
                    <section>
                        <h2 className={`mb-2 text-xs font-bold ${heading}`}>1. Choose your booking</h2>
                        <div className="grid gap-2 sm:grid-cols-2">
                            {BOOKINGS.map((booking) => {
                                const active = bookingId === booking.id;
                                return (
                                    <button
                                        key={booking.id}
                                        type="button"
                                        onClick={() => setBookingId(booking.id)}
                                        aria-pressed={active}
                                        className={`rounded-xl border p-3 text-left transition-colors ${active ? 'border-[#d6f52f] ring-1 ring-[#d6f52f]' : surface}`}
                                    >
                                        <span className="flex items-start gap-2.5">
                                            <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${active ? 'border-[#d6f52f] bg-[#d6f52f]' : darkMode ? 'border-[#31523e]' : 'border-slate-300'}`}>
                                                {active && <span className="h-1.5 w-1.5 rounded-full bg-[#0b2117]" />}
                                            </span>
                                            <span>
                                                <span className={`block text-xs font-semibold ${heading}`}>{booking.name}</span>
                                                <span className={`mt-0.5 block text-[10px] ${muted}`}>{booking.detail}</span>
                                            </span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    <section className="mt-5">
                        <h2 className={`mb-2 text-xs font-bold ${heading}`}>2. Pick your gear</h2>
                        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {GEAR.map((item) => {
                                const Icon = item.icon;
                                const quantity = quantities[item.id] || 0;
                                return (
                                    <article key={item.id} className={`rounded-xl border p-3 ${surface}`}>
                                        <div className="flex items-start gap-2.5">
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d6f52f]/15 text-[#b8d326]">
                                                <Icon className="h-4 w-4" aria-hidden="true" />
                                            </span>
                                            <div className="min-w-0">
                                                <h3 className={`text-xs font-bold ${heading}`}>{item.name}</h3>
                                                <p className={`mt-0.5 text-[10px] ${muted}`}>{item.detail}</p>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex items-end justify-between gap-2">
                                            <div>
                                                <p className={`text-sm font-extrabold ${heading}`}>₱{item.price}</p>
                                                <p className={`text-[10px] ${muted}`}>{item.available} available</p>
                                            </div>
                                            <div className={`flex items-center gap-2 rounded-full border px-2 py-1 ${darkMode ? 'border-[#254533]' : 'border-slate-200'}`}>
                                                <button
                                                    type="button"
                                                    onClick={() => changeQuantity(item, -1)}
                                                    disabled={quantity === 0}
                                                    aria-label={`Remove one ${item.name}`}
                                                    className="text-slate-400 disabled:opacity-40"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className={`min-w-3 text-center text-[10px] font-semibold ${heading}`}>{quantity}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => changeQuantity(item, 1)}
                                                    disabled={quantity >= item.available}
                                                    aria-label={`Add one ${item.name}`}
                                                    className="text-slate-400 disabled:opacity-40"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>

                    <section className="mt-8">
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                            <h2 className={`text-sm font-extrabold ${heading}`}>My rentals</h2>
                            <div className={`inline-flex rounded-full border p-1 ${darkMode ? 'border-[#19382b] bg-[#0b2117]' : 'border-[#dfe5da] bg-white'}`}>
                                {['Active', 'History'].map((tab) => (
                                    <button
                                        key={tab}
                                        type="button"
                                        onClick={() => setRentalTab(tab)}
                                        aria-pressed={rentalTab === tab}
                                        className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${rentalTab === tab ? 'bg-[#d6f52f] text-[#0b2117]' : muted}`}
                                    >
                                        {tab} {tab === 'Active' ? rentals.length : 0}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            {(rentalTab === 'Active' ? rentals : []).map((rental) => (
                                <article key={rental.code} className={`rounded-xl border p-3 ${surface}`}>
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className={`text-xs font-bold ${heading}`}>{rental.booking}</h3>
                                            <p className={`mt-0.5 text-[10px] ${muted}`}>{rental.detail}</p>
                                        </div>
                                        <Badge variant={rental.status === 'Reserved' ? 'brand' : 'warning'}>
                                            {rental.status}
                                        </Badge>
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                        {rental.items.map((item) => (
                                            <span key={item} className={`rounded-full px-2 py-1 text-[10px] ${darkMode ? 'bg-[#153326] text-[#b8cdbf]' : 'bg-[#f0f3eb] text-slate-600'}`}>
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                    <div className={`mt-2 flex items-center justify-between border-t pt-2 ${darkMode ? 'border-[#19382b]' : 'border-slate-100'}`}>
                                        <div>
                                            <p className={`text-[10px] font-semibold ${heading}`}>{rental.code}</p>
                                            <p className={`mt-0.5 text-[10px] ${muted}`}>Return to the front desk when your game ends.</p>
                                        </div>
                                        <p className={`text-xs font-extrabold ${heading}`}>₱{rental.total}</p>
                                    </div>
                                </article>
                            ))}
                            {rentalTab === 'History' && (
                                <p className={`rounded-xl border p-4 text-center text-xs ${surface} ${muted}`}>
                                    No past rentals yet.
                                </p>
                            )}
                        </div>
                    </section>
                </div>

                <aside className="h-fit xl:sticky xl:top-4">
                    <div className={`rounded-2xl border p-3 ${surface}`}>
                        <h2 className={`text-xs font-extrabold ${heading}`}>Your rental</h2>
                        <p className={`mt-1 text-[10px] ${muted}`}>
                            {selectedBooking.name} · {selectedBooking.detail}
                        </p>

                        <div className="my-4 min-h-12">
                            {selectedItems.length ? (
                                <ul className="space-y-2">
                                    {selectedItems.map((item) => (
                                        <li key={item.id} className={`flex justify-between gap-2 text-[10px] ${muted}`}>
                                            <span>{quantities[item.id]}× {item.name}</span>
                                            <span>₱{item.price * quantities[item.id]}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className={`py-2 text-center text-[10px] ${muted}`}>
                                    Add paddles, balls or other gear.
                                </p>
                            )}
                        </div>

                        <div className={`flex items-center justify-between border-t py-3 ${darkMode ? 'border-[#19382b]' : 'border-slate-100'}`}>
                            <span className={`text-xs font-semibold ${heading}`}>Total · pay at pickup</span>
                            <span className={`text-sm font-extrabold ${heading}`}>₱{total}</span>
                        </div>
                        <Button
                            type="button"
                            variant="dinkzone"
                            darkMode={darkMode}
                            onClick={reserveGear}
                            className="w-full rounded-lg px-3 py-2.5 text-xs font-bold"
                        >
                            Reserve gear
                        </Button>
                        <p className={`mt-2 text-center text-[10px] ${muted}`}>Free to cancel before pickup.</p>
                    </div>
                </aside>
            </div>
        </div>
    );
}
