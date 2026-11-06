import { useEffect, useRef } from 'react';
import { AlertCircle, X } from 'lucide-react';

export default function CancelSection({ booking, darkMode, onClose, onConfirm }) {
    const keepButton = useRef(null);
    const panel = darkMode ? 'border-[#19382b] bg-[#0b2117]' : 'border-[#dfe5da] bg-white';
    const main = darkMode ? 'text-[#edf4ef]' : 'text-slate-900';
    const muted = darkMode ? 'text-[#8eaa99]' : 'text-slate-500';

    useEffect(() => {
        keepButton.current?.focus();
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#020905]/75 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="cancel-title"
                className={`w-full max-w-md overflow-hidden rounded-2xl border shadow-[0_30px_90px_rgba(0,0,0,0.5)] ${panel}`}
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
                <div className="flex items-start justify-between gap-3 p-4">
                    <div>
                        <h2 id="cancel-title" className={`text-base font-bold ${main}`}>Cancel this booking?</h2>
                        <p className={`mt-1 text-xs ${muted}`}>{booking.venue} · {booking.date}, {booking.time}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close cancellation dialog"
                        className={`rounded-lg p-1 ${muted} hover:bg-white/5`}
                    >
                        <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                </div>
                <div className="px-4 pb-4">
                    <p className={`rounded-xl px-3 py-2.5 text-xs font-semibold ${darkMode ? 'bg-[#102a1e] text-[#c2d2c8]' : 'bg-[#f1f5ef] text-slate-700'}`}>
                        Refund: 0% · ₱0
                    </p>
                    <ul className={`mt-3 space-y-1.5 text-[11px] leading-relaxed ${muted}`}>
                        <li>• Free cancellation up to 24 hours before your slot.</li>
                        <li>• 50% refund between 24 and 6 hours before.</li>
                        <li>• No refund within 6 hours — reschedule once for free instead.</li>
                    </ul>
                </div>
                <div className={`flex justify-end gap-2 border-t p-3 ${darkMode ? 'border-[#19382b]' : 'border-[#e7ece5]'}`}>
                    <button
                        ref={keepButton}
                        type="button"
                        onClick={onClose}
                        className={`min-h-10 rounded-lg px-3 text-xs font-semibold ${darkMode ? 'text-[#c2d2c8] hover:bg-[#102a1e]' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                        Keep booking
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-[#fb6e73] px-3 text-xs font-bold text-white transition-colors hover:bg-[#f45f65] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
                    >
                        <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        Cancel booking
                    </button>
                </div>
            </section>
        </div>
    );
}