import { CalendarDays, Check, CircleUserRound, QrCode, Users } from 'lucide-react';
import Badge from '@/app/components/Badge';
import Button from '@/app/components/Button';

function formatPrice(price) {
    return `₱${price.toLocaleString()}`;
}

export default function BookCardSection({
    booking,
    darkMode,
    onCheckIn,
    onReschedule,
    onCancel,
}) {
    const panel = darkMode ? 'border-[#19382b] bg-[#0b2117]' : 'border-[#dfe5da] bg-white';
    const muted = darkMode ? 'text-[#8eaa99]' : 'text-slate-500';
    const title = darkMode ? 'text-[#edf4ef]' : 'text-slate-900';
    const accentButton = 'bg-[#d6f52f] text-[#0b2117] hover:bg-[#e1ff3d]';

    return (
        <article className={`flex flex-col gap-3 rounded-2xl border px-4 py-3 sm:flex-row sm:items-center sm:gap-4 ${panel}`}>
            <div className={`flex h-14 w-12 shrink-0 flex-col items-center justify-center rounded-xl ${darkMode ? 'bg-[#102a1e]' : 'bg-[#f0f5ef]'}`}>
                <span className={`text-[9px] font-bold uppercase ${muted}`}>{booking.date.split(' ')[0]}</span>
                <span className={`text-xl font-black leading-5 ${title}`}>{booking.date.split(' ')[1]}</span>
                <span className={`text-[9px] ${muted}`}>{booking.weekday}</span>
            </div>

            <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                    <Badge variant={darkMode ? 'brand' : 'success'} className={`inline-flex items-center gap-1 text-[10px] font-bold ${darkMode ? '' : '!bg-[#edf6de] !text-[#577321]'}`}>
                        <CalendarDays className="h-3 w-3" aria-hidden="true" />
                        {booking.status}
                    </Badge>
                    {booking.passLive && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Pass is live
                        </span>
                    )}
                </div>
                <h2 className={`truncate text-sm font-bold ${title}`}>{booking.venue}</h2>
                <div className={`mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] ${muted}`}>
                    <span className="whitespace-nowrap">{booking.time}</span>
                    <span className="whitespace-nowrap">{booking.court}</span>
                    <span className="inline-flex items-center gap-1 whitespace-nowrap">
                        <Users className="h-3 w-3" aria-hidden="true" />
                        {booking.players}
                    </span>
                    <span className="inline-flex items-center gap-1 whitespace-nowrap">
                        <CircleUserRound className="h-3 w-3" aria-hidden="true" />
                        {formatPrice(booking.price)}
                    </span>
                </div>
            </div>

            <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-end sm:gap-2.5">
                {booking.upcoming ? (
                    <>
                        <Button
                            type="button"
                            variant="dinkzone"
                            size="sm"
                            onClick={onCheckIn}
                            className={`min-h-9 gap-1.5 rounded-lg !px-2.5 text-xs font-semibold ${booking.passLive ? accentButton : darkMode ? '!bg-[#102a1e] !text-[#d7e4dc] hover:!bg-[#183526]' : '!bg-[#f1f5ef] !text-slate-700 hover:!bg-[#e7eee3]'}`}
                        >
                            {booking.passLive ? <QrCode className="h-3.5 w-3.5" aria-hidden="true" /> : <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                            Check in
                        </Button>
                        <Button
                            type="button"
                            variant="dinkzone"
                            outlined
                            darkMode={darkMode}
                            size="sm"
                            onClick={onReschedule}
                            className={`min-h-9 rounded-lg !border-transparent !bg-transparent !px-2 text-xs font-semibold ${darkMode ? '!text-[#d7e4dc] hover:!bg-[#102a1e]' : '!text-slate-700 hover:!bg-[#f1f5ef]'}`}
                        >
                            Reschedule
                        </Button>
                        <Button
                            type="button"
                            variant="dinkzone"
                            outlined
                            darkMode={darkMode}
                            size="sm"
                            onClick={onCancel}
                            className={`min-h-9 rounded-lg !border-transparent !bg-transparent !px-2 text-xs font-semibold focus-visible:ring-rose-400 ${darkMode ? '!text-[#d7e4dc] hover:!bg-[#102a1e]' : '!text-slate-700 hover:!bg-[#f1f5ef]'}`}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <span className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-semibold ${darkMode ? 'bg-[#102a1e] text-[#8eaa99]' : 'bg-[#f1f5ef] text-slate-500'}`}>
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        {booking.status}
                    </span>
                )}
            </div>
        </article>
    );
}