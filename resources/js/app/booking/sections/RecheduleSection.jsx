import { useEffect, useRef, useState } from 'react';
import { CalendarDays, Clock3, X } from 'lucide-react';

const DATES = [
    { date: 'Nov 3', weekday: 'Today' },
    { date: 'Nov 4', weekday: 'Wed' },
    { date: 'Nov 5', weekday: 'Thu' },
    { date: 'Nov 6', weekday: 'Fri' },
    { date: 'Nov 7', weekday: 'Sat' },
    { date: 'Nov 8', weekday: 'Sun' },
    { date: 'Nov 9', weekday: 'Mon' },
];
const TIMES = ['9 PM', '10 PM', '11 PM'];

export default function RecheduleSection({ booking, darkMode, onClose, onReschedule }) {
    const [selectedDate, setSelectedDate] = useState(DATES[0]);
    const [selectedTime, setSelectedTime] = useState('');
    const closeButton = useRef(null);
    const panel = darkMode ? 'border-l-[#19382b] bg-[#0b2117]' : 'border-l-[#dfe5da] bg-white';
    const main = darkMode ? 'text-[#edf4ef]' : 'text-slate-900';
    const muted = darkMode ? 'text-[#8eaa99]' : 'text-slate-500';

    useEffect(() => {
        closeButton.current?.focus();
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-40 bg-[#020905]/60 backdrop-blur-[2px]"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <aside
                role="dialog"
                aria-modal="true"
                aria-labelledby="reschedule-title"
                className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l p-4 shadow-[-24px_0_70px_rgba(0,0,0,0.35)] sm:p-5 ${panel}`}
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
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h2 id="reschedule-title" className={`text-base font-bold ${main}`}>Reschedule</h2>
                        <p className={`mt-0.5 truncate text-xs ${muted}`}>{booking.court} · {booking.venue}</p>
                    </div>
                    <button
                        ref={closeButton}
                        type="button"
                        onClick={onClose}
                        aria-label="Close reschedule panel"
                        className={`rounded-lg p-1.5 ${muted} hover:bg-white/5`}
                    >
                        <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                </div>

                <div className="mt-5">
                    <h3 className={`mb-2 text-xs font-bold ${main}`}>Date</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {DATES.map((item) => {
                            const active = selectedDate.date === item.date;
                            return (
                                <button
                                    key={item.date}
                                    type="button"
                                    aria-pressed={active}
                                    onClick={() => setSelectedDate(item)}
                                    className={`min-h-10 rounded-xl border px-2 text-[10px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f] ${active ? 'border-[#d6f52f] bg-[#d6f52f] text-[#0b2117]' : darkMode ? 'border-[#19382b] text-[#d7e4dc] hover:bg-[#102a1e]' : 'border-[#dfe5da] text-slate-700 hover:bg-[#f1f5ef]'}`}
                                >
                                    <span className="block">{item.weekday}</span>
                                    {item.date}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className={`mb-2 inline-flex items-center gap-1.5 text-xs font-bold ${main}`}>
                        <CalendarDays className="h-3.5 w-3.5 text-[#d6f52f]" aria-hidden="true" />
                        Open times on {booking.court}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {TIMES.map((time) => {
                            const active = selectedTime === time;
                            return (
                                <button
                                    key={time}
                                    type="button"
                                    aria-pressed={active}
                                    onClick={() => setSelectedTime(time)}
                                    className={`inline-flex min-h-10 min-w-20 items-center justify-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f] ${active ? 'border-[#d6f52f] bg-[#d6f52f] text-[#0b2117]' : darkMode ? 'border-[#19382b] text-[#d7e4dc] hover:bg-[#102a1e]' : 'border-[#dfe5da] text-slate-700 hover:bg-[#f1f5ef]'}`}
                                >
                                    {active && <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />}
                                    {time}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className={`mt-5 rounded-xl border p-3 text-[10px] ${darkMode ? 'border-[#19382b] bg-[#071b14] text-[#8eaa99]' : 'border-[#e7ece5] bg-[#f8faf6] text-slate-500'}`}>
                    Your existing booking stays unchanged until you choose a new time.
                </div>
                <div className="mt-auto pt-5">
                    <button
                        type="button"
                        disabled={!selectedTime}
                        onClick={() => onReschedule({
                            date: selectedDate.date,
                            weekday: selectedDate.weekday,
                            time: selectedTime,
                        })}
                        className="min-h-11 w-full rounded-xl bg-[#d6f52f] px-4 text-xs font-bold text-[#0b2117] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(214,245,47,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                    >
                        Pick a new time
                    </button>
                </div>
            </aside>
        </div>
    );
}