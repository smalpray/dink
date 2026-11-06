import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, CreditCard, Info, Signal, Sun, Users, X } from 'lucide-react';

function isFinderCell(row, column, originRow, originColumn) {
    const localRow = row - originRow;
    const localColumn = column - originColumn;

    if (localRow < 0 || localRow > 6 || localColumn < 0 || localColumn > 6) {
        return null;
    }

    return localRow === 0 || localRow === 6 || localColumn === 0 || localColumn === 6
        || (localRow >= 2 && localRow <= 4 && localColumn >= 2 && localColumn <= 4);
}

function makeQrPattern() {
    return Array.from({ length: 25 }, (_, row) =>
        Array.from({ length: 25 }, (_, column) => {
            const finderOrigins = [[0, 0], [0, 18], [18, 0]];

            for (const [originRow, originColumn] of finderOrigins) {
                const finderCell = isFinderCell(row, column, originRow, originColumn);
                if (finderCell !== null) {
                    return finderCell;
                }
            }

            return ((row * 13 + column * 7 + row * column) % 9) < 4;
        }),
    );
}

export default function CheckInSection({ booking, darkMode, onClose, onSimulateScan }) {
    const [scanned, setScanned] = useState(false);
    const closeButton = useRef(null);
    const pattern = useMemo(makeQrPattern, []);
    const panel = darkMode ? 'border-[#19382b] bg-[#0b2117]' : 'border-[#dfe5da] bg-white';
    const muted = darkMode ? 'text-[#8eaa99]' : 'text-slate-500';
    const main = darkMode ? 'text-[#edf4ef]' : 'text-slate-900';

    useEffect(() => {
        closeButton.current?.focus();
    }, [onClose]);

    const simulateScan = () => {
        setScanned(true);
        onSimulateScan();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#020905]/75 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="checkin-title"
                className={`relative w-full max-w-3xl rounded-2xl border p-4 shadow-[0_30px_90px_rgba(0,0,0,0.5)] sm:p-6 ${panel}`}
                onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                        event.preventDefault();
                        onClose();
                    }

                    if (event.key === 'Tab') {
                        const focusableElements = event.currentTarget.querySelectorAll(
                            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
                        );
                        const firstElement = focusableElements[0];
                        const lastElement = focusableElements[focusableElements.length - 1];

                        if (event.shiftKey && document.activeElement === firstElement) {
                            event.preventDefault();
                            lastElement?.focus();
                        } else if (!event.shiftKey && document.activeElement === lastElement) {
                            event.preventDefault();
                            firstElement?.focus();
                        }
                    }
                }}
            >
                <div className="mb-5 flex items-start gap-3">
                    <button
                        ref={closeButton}
                        type="button"
                        onClick={onClose}
                        aria-label="Close check-in pass"
                        className={`mt-0.5 rounded-lg p-1.5 ${darkMode ? 'text-[#c2d2c8] hover:bg-[#102a1e]' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                        <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <div className="min-w-0">
                        <h2 id="checkin-title" className={`truncate text-sm font-bold ${main}`}>{booking.venue}</h2>
                        <p className={`mt-0.5 text-[10px] ${muted}`}>{booking.date}, {booking.time} · {booking.court}</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <section className={`flex flex-col items-center rounded-2xl border p-4 text-center ${darkMode ? 'border-[#19382b] bg-[#071b14]' : 'border-[#e8ece5] bg-[#f8faf6]'}`}>
                        <p className={`mb-4 inline-flex items-center gap-1.5 text-[11px] font-semibold ${scanned ? 'text-emerald-500' : 'text-emerald-400'}`}>
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                            {scanned ? 'Checked in' : 'Ready to enter'}
                        </p>
                        <div
                            role="img"
                            aria-label={`Demo check-in QR code for pass ${booking.code}`}
                            className="grid aspect-square w-full max-w-[236px] gap-[2px] rounded-xl bg-white p-3"
                            style={{ gridTemplateColumns: 'repeat(25, minmax(0, 1fr))' }}
                        >
                            {pattern.flatMap((row, rowIndex) =>
                                row.map((isDark, columnIndex) => (
                                    <span
                                        key={`${rowIndex}-${columnIndex}`}
                                        className={isDark ? 'bg-[#0b2117]' : 'bg-white'}
                                    />
                                )),
                            )}
                        </div>
                        <p className={`mt-3 font-mono text-[11px] font-bold tracking-[0.2em] ${main}`}>{booking.code}</p>
                        <p className={`mt-1 text-[10px] ${muted}`}>Show this demo pass at the gate.</p>
                        <span className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold ${darkMode ? 'bg-[#102a1e] text-[#d7e4dc]' : 'bg-[#edf4ec] text-slate-600'}`}>
                            <Sun className="h-3 w-3 text-amber-400" aria-hidden="true" />
                            Turn your screen brightness up for faster scanning
                        </span>
                    </section>

                    <div className="flex flex-col gap-3">
                        <section className="flex flex-1 flex-col rounded-2xl border border-[#1c4937] bg-[#0d3325] p-4">
                            <h3 className="text-sm font-bold text-white">Tap to enter</h3>
                            <p className="mt-1 text-[11px] leading-relaxed text-[#b8d2c2]">
                                Hold your phone or linked card near the gate reader.
                            </p>
                            <div className="flex flex-1 flex-col items-center justify-center gap-5 py-5">
                                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d6f52f] text-[#0b2117]">
                                    <Signal className="h-7 w-7" aria-hidden="true" />
                                </span>
                                <p className="inline-flex items-center gap-1.5 text-[10px] text-white">
                                    <CreditCard className="h-3.5 w-3.5 text-[#d6f52f]" aria-hidden="true" />
                                    Linked: DinkZone member card · 7F2A
                                </p>
                            </div>
                            <span className="rounded-full bg-white/10 px-3 py-2 text-center text-[10px] font-semibold text-[#d4e5da]">
                                Phone NFC (not supported here)
                            </span>
                        </section>

                        <button
                            type="button"
                            onClick={simulateScan}
                            disabled={scanned}
                            className={`min-h-10 rounded-xl border px-4 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f] disabled:cursor-not-allowed ${darkMode ? 'border-[#19382b] text-[#c2d2c8] hover:bg-[#102a1e] disabled:text-emerald-400' : 'border-[#dfe5da] text-slate-700 hover:bg-slate-50 disabled:text-emerald-600'}`}
                        >
                            {scanned ? 'Gate scan simulated' : 'Demo: simulate gate scan'}
                        </button>

                        <section className={`rounded-2xl border p-3.5 ${panel}`}>
                            <h3 className={`text-[11px] font-bold ${main}`}>Gate tips</h3>
                            <ul className={`mt-2 space-y-2 text-[10px] ${muted}`}>
                                <li className="flex gap-2"><Info className="h-3 w-3 shrink-0" /> Demo pass is shown only in this browser session.</li>
                                <li className="flex gap-2"><Users className="h-3 w-3 shrink-0" /> One scan admits all {booking.players} players.</li>
                                <li className="flex gap-2"><CheckCircle2 className="h-3 w-3 shrink-0" /> Ask the front desk if you need help checking in.</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
}