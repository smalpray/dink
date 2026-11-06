import { useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    CalendarPlus,
    Check,
    CreditCard,
    Radio,
    Smartphone,
    Volume2,
} from 'lucide-react';

function createDemoCode() {
    return `DZ-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

function createDemoPattern(code) {
    const seed = Array.from(code).reduce((total, character) => total + character.charCodeAt(0), 0);

    return Array.from({ length: 25 }, (_, row) =>
        Array.from({ length: 25 }, (_, column) => {
            const isFinderArea =
                (row < 7 && column < 7) ||
                (row < 7 && column >= 18) ||
                (row >= 18 && column < 7);

            if (isFinderArea) {
                const finderRow = row >= 18 ? row - 18 : row;
                const finderColumn = column >= 18 ? column - 18 : column;
                const isBorder =
                    finderRow === 0 ||
                    finderRow === 6 ||
                    finderColumn === 0 ||
                    finderColumn === 6;

                return isBorder || (finderRow >= 2 && finderRow <= 4 && finderColumn >= 2 && finderColumn <= 4);
            }

            return (row * 17 + column * 31 + seed + row * column) % 3 !== 0;
        }),
    );
}

function formatHour(hour) {
    const normalizedHour = hour % 24;
    const period = normalizedHour >= 12 ? 'PM' : 'AM';
    const displayHour = normalizedHour % 12 || 12;

    return `${displayHour} ${period}`;
}

function formatLongDate(date) {
    return new Intl.DateTimeFormat('en', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
    }).format(date);
}

function escapeCalendarValue(value) {
    return value.replace(/[\\,;]/g, '\\$&').replace(/\n/g, '\\n');
}

function downloadCalendarEvent({ court, date, startHour, endHour, code }) {
    const start = new Date(date);
    start.setHours(startHour, 0, 0, 0);
    const end = new Date(date);
    end.setHours(endHour, 0, 0, 0);
    const formatCalendarDate = (value) =>
        `${value.getFullYear()}${String(value.getMonth() + 1).padStart(2, '0')}${String(value.getDate()).padStart(2, '0')}T${String(value.getHours()).padStart(2, '0')}0000`;
    const content = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//DinkZone//Demo booking//EN',
        'BEGIN:VEVENT',
        `UID:${code}@dinkzone.local`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')}`,
        `DTSTART:${formatCalendarDate(start)}`,
        `DTEND:${formatCalendarDate(end)}`,
        `SUMMARY:${escapeCalendarValue(`Pickleball at ${court.name}`)}`,
        `LOCATION:${escapeCalendarValue(court.address)}`,
        'END:VEVENT',
        'END:VCALENDAR',
    ].join('\r\n');
    const downloadUrl = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'dinkzone-demo-booking.ics';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
}

export default function BookingConfirmationSection({
    court,
    date,
    selectedSlots,
    playerCount,
    addOns,
    paymentMethod,
    total,
    darkMode = false,
    onDone = () => {},
}) {
    const [passCode] = useState(createDemoCode);
    const [nfcEnabled, setNfcEnabled] = useState(true);
    const [notice, setNotice] = useState('');
    const passRef = useRef(null);
    const selectedHours = selectedSlots.map((slot) => slot.hour).sort((a, b) => a - b);
    const startHour = selectedHours[0];
    const endHour = selectedHours[selectedHours.length - 1] + 1;
    const courtNumber = selectedSlots[0]?.courtNumber;
    const passPattern = createDemoPattern(passCode);
    const palette = darkMode
        ? {
              background: 'bg-[#07140f] text-[#e8f0eb]',
              panel: 'border-[#19382b] bg-[#0b2117]',
              muted: 'text-[#8eaa99]',
              heading: 'text-[#edf4ef]',
              inset: 'bg-[#102a1e]',
          }
        : {
              background: 'bg-[#f5f7f3] text-slate-900',
              panel: 'border-[#dfe5da] bg-white',
              muted: 'text-slate-500',
              heading: 'text-slate-900',
              inset: 'bg-[#f0f5ef]',
          };

    const paymentStatus = paymentMethod === 'Venue'
        ? 'Pay at venue · due'
        : `${paymentMethod} · demo paid`;

    return (
        <div className={`min-h-screen flex-1 overflow-y-auto transition-colors lg:h-full lg:min-h-0 ${palette.background}`}>
            <main className="mx-auto w-full max-w-4xl px-4 pb-10 pt-16 sm:px-6 sm:pt-8 lg:px-8">
                <header className="flex items-center gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-white shadow-[0_0_26px_rgba(52,211,153,0.2)] sm:h-14 sm:w-14">
                        <Check className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                        <h1 className={`text-2xl font-bold tracking-tight sm:text-3xl ${palette.heading}`}>
                            Demo booking ready.
                        </h1>
                        <p className={`text-xs sm:text-sm ${palette.muted}`}>
                            {formatLongDate(date)} · {formatHour(startHour)} – {formatHour(endHour)} · Court {courtNumber}
                        </p>
                    </div>
                </header>

                <div className="mt-5 grid grid-cols-1 items-start gap-4 md:grid-cols-[minmax(240px,290px)_minmax(0,1fr)]">
                    <section
                        aria-label="Demo entry pass"
                        id="demo-entry-pass"
                        ref={passRef}
                        tabIndex={-1}
                        className={`overflow-hidden rounded-2xl border focus:outline-none ${palette.panel}`}
                    >
                        <div className="relative overflow-hidden bg-[#0d3324] px-4 py-3">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 opacity-15"
                                style={{
                                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, #d6f52f 8px, #d6f52f 9px)',
                                }}
                            />
                            <p className="relative text-[9px] font-bold uppercase tracking-[0.18em] text-[#d6f52f]">
                                Demo entry pass · not valid for check-in
                            </p>
                            <h2 className="relative mt-1 text-sm font-bold text-white">{court.name}</h2>
                            <dl className="relative mt-3 grid grid-cols-3 gap-2 text-[10px]">
                                <div>
                                    <dt className="text-[#8eaa99]">Date</dt>
                                    <dd className="mt-0.5 font-semibold text-white">
                                        {new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(date)}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-[#8eaa99]">Time</dt>
                                    <dd className="mt-0.5 font-semibold text-white">{formatHour(startHour)}</dd>
                                </div>
                                <div>
                                    <dt className="text-[#8eaa99]">Court</dt>
                                    <dd className="mt-0.5 font-semibold text-white">{courtNumber}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="flex flex-col items-center px-4 py-4">
                            <div
                                role="img"
                                aria-label="Decorative, non-scannable demo pattern"
                                className="grid aspect-square w-40 gap-px rounded-xl bg-white p-2 sm:w-44"
                                style={{ gridTemplateColumns: 'repeat(25, minmax(0, 1fr))' }}
                            >
                                {passPattern.flatMap((row, rowIndex) =>
                                    row.map((isDark, columnIndex) => (
                                        <span
                                            key={`${rowIndex}-${columnIndex}`}
                                            className={isDark ? 'bg-[#102a1e]' : 'bg-white'}
                                        />
                                    )),
                                )}
                            </div>
                            <p className={`mt-2 text-xs font-bold tracking-wider ${palette.heading}`}>{passCode}</p>
                            <p className={`mt-1 text-center text-[10px] ${palette.muted}`}>
                                Demo only — no real reservation or scannable pass was created.
                            </p>
                        </div>
                    </section>

                    <div className="flex flex-col gap-3">
                        <button
                            type="button"
                            onClick={() => passRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#d6f52f] px-4 text-xs font-bold text-[#0b2117] transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(214,245,47,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]"
                        >
                            Open demo check-in pass
                        </button>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    downloadCalendarEvent({ court, date, startHour, endHour, code: passCode });
                                    setNotice('Calendar file downloaded for this demo booking.');
                                }}
                                className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-3 text-[11px] font-semibold ${palette.inset} ${palette.heading} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]`}
                            >
                                <CalendarPlus className="h-3.5 w-3.5" aria-hidden="true" />
                                Add to calendar
                            </button>
                            <button
                                type="button"
                                aria-pressed={nfcEnabled}
                                onClick={() => setNfcEnabled((current) => !current)}
                                className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-3 text-[11px] font-semibold ${palette.inset} ${palette.heading} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]`}
                            >
                                {nfcEnabled ? (
                                    <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
                                ) : (
                                    <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                                )}
                                {nfcEnabled ? 'Manage NFC' : 'Enable NFC'}
                            </button>
                        </div>

                        <p role="status" className={`flex min-h-8 items-center gap-2 rounded-lg px-3 py-2 text-[10px] ${darkMode ? 'bg-[#26380c] text-[#d6f52f]' : 'bg-[#edf6de] text-[#577321]'}`}>
                            <Radio className="h-3 w-3 shrink-0" aria-hidden="true" />
                            {nfcEnabled ? 'Demo tap-to-enter is on' : 'Demo tap-to-enter is off'} · no NFC access
                        </p>

                        <section className={`rounded-2xl border p-3.5 ${palette.panel}`}>
                            <h2 className={`text-sm font-bold ${palette.heading}`}>Summary</h2>
                            <dl className="mt-2 flex flex-col gap-2 text-[11px]">
                                <div className="flex items-start justify-between gap-3">
                                    <dt className={palette.muted}>Address</dt>
                                    <dd className={`max-w-[70%] text-right font-medium ${palette.heading}`}>{court.address}</dd>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <dt className={palette.muted}>Players</dt>
                                    <dd className={`font-medium ${palette.heading}`}>{playerCount}</dd>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <dt className={palette.muted}>Payment</dt>
                                    <dd className={`inline-flex items-center gap-1 font-medium ${palette.heading}`}>
                                        <CreditCard className="h-3 w-3" aria-hidden="true" />
                                        {paymentStatus}
                                    </dd>
                                </div>
                                {Object.entries(addOns).filter(([, quantity]) => quantity > 0).map(([name, quantity]) => (
                                    <div key={name} className="flex items-center justify-between gap-3">
                                        <dt className={palette.muted}>{name === 'balls' ? 'Ball pack' : name === 'water' ? 'Cold water' : 'Paddle rental'}</dt>
                                        <dd className={`font-medium ${palette.heading}`}>×{quantity}</dd>
                                    </div>
                                ))}
                                <div className={`flex items-center justify-between gap-3 border-t pt-2 ${darkMode ? 'border-[#19382b]' : 'border-[#e2e8df]'}`}>
                                    <dt className={palette.muted}>Total</dt>
                                    <dd className={`font-bold ${palette.heading}`}>₱{total.toLocaleString()}</dd>
                                </div>
                            </dl>
                        </section>

                        {notice && (
                            <p role="status" className={`rounded-xl border px-3 py-2 text-xs ${darkMode ? 'border-[#27583a] bg-[#0c2b1d] text-[#a3e6ba]' : 'border-[#cfe6d4] bg-[#f0faf2] text-[#23683c]'}`}>
                                {notice}
                            </p>
                        )}

                        <Link
                            href="/bookings"
                            className="min-h-11 inline-flex items-center text-xs font-bold text-[#d6f52f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]"
                        >
                            View all bookings
                        </Link>
                        <button
                            type="button"
                            onClick={onDone}
                            className={`min-h-10 rounded-xl border text-xs font-semibold ${darkMode ? 'border-[#19382b] text-[#d7e4dc] hover:bg-[#102a1e]' : 'border-[#dfe5da] text-slate-700 hover:bg-[#f0f5ef]'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]`}
                        >
                            Back to courts
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
