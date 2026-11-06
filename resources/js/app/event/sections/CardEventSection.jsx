import { MapPin, Trophy } from 'lucide-react';
import Badge from '@/app/components/Badge';

function formatCurrency(value) {
    return `₱${value.toLocaleString()}`;
}

export default function CardEventSection({
    darkMode,
    events,
    status,
    level,
    division,
    month,
    onSelect,
}) {
    const palette = darkMode
        ? {
              card: 'border-[#19382b] bg-[#0b2117]',
              text: 'text-[#edf4ef]',
              muted: 'text-[#8eaa99]',
              divider: 'border-[#19382b]',
              tag: 'bg-[#102a1e] text-[#bdd1c3]',
          }
        : {
              card: 'border-[#dfe5da] bg-white',
              text: 'text-slate-900',
              muted: 'text-slate-500',
              divider: 'border-[#e8ece5]',
              tag: 'bg-[#f0f5ef] text-slate-600',
          };

    const filteredEvents = events.filter((event) => {
        const matchesStatus = event.status === status;
        const matchesLevel = level === 'All levels' || event.levels.includes(level);
        const matchesDivision = division === 'All formats'
            || event.format.toLowerCase().includes(division.toLowerCase())
            || event.division === division;
        const matchesMonth = month === 'All months' || event.month === month;

        return matchesStatus && matchesLevel && matchesDivision && matchesMonth;
    });

    return (
        <section className="pt-6" aria-label={`${status} tournaments`}>
            {filteredEvents.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
                    {filteredEvents.map((event) => (
                        <article
                            key={event.id}
                            className={`group overflow-hidden rounded-2xl border transition-[border-color,transform,box-shadow] hover:-translate-y-0.5 hover:border-[#577247] hover:shadow-[0_14px_34px_rgba(0,0,0,0.2)] ${palette.card}`}
                        >
                            <button
                                type="button"
                                onClick={() => onSelect(event)}
                                className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d6f52f]"
                                aria-label={`View ${event.title}`}
                            >
                                <div className="relative h-36 overflow-hidden sm:h-40">
                                    <img
                                        src={event.image}
                                        alt=""
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#04100b]/90 via-[#04100b]/15 to-[#04100b]/20" />
                                    <Badge variant="brand" className="absolute left-3 top-3 backdrop-blur">
                                        {event.format}
                                    </Badge>
                                    {event.status === 'Live' && (
                                        <Badge variant="error" className="absolute right-3 top-3 inline-flex items-center gap-1.5 !bg-[#ff6969] !text-white">
                                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                            LIVE
                                        </Badge>
                                    )}
                                    <div className="absolute inset-x-3 bottom-3">
                                        <p className="text-[10px] font-medium text-slate-200">{event.date}</p>
                                        <h2 className="mt-0.5 text-base font-bold leading-tight text-white">{event.title}</h2>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <p className={`flex items-center gap-1.5 text-xs ${palette.muted}`}>
                                        <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                                        <span className="truncate">{event.location}</span>
                                    </p>
                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                        {event.levels.map((item) => (
                                            <span key={item} className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${palette.tag}`}>
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                    <div className={`mt-3 flex items-end justify-between gap-2 border-t pt-3 ${palette.divider}`}>
                                        <div>
                                            <p className={`text-[9px] font-bold uppercase tracking-[0.16em] ${palette.muted}`}>Prize pool</p>
                                            <p className="text-xl font-black leading-none tracking-tight text-[#d6f52f]">{formatCurrency(event.prize)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-[10px] font-bold ${palette.text}`}>{formatCurrency(event.entry)} entry</p>
                                            <p className={`mt-0.5 text-[9px] ${palette.muted}`}>
                                                {event.status === 'Live' ? 'Registration closed' : `${event.slots} slots left`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </article>
                    ))}
                </div>
            ) : (
                <div className={`rounded-2xl border px-5 py-12 text-center ${palette.card}`}>
                    <Trophy className="mx-auto h-8 w-8 text-[#d6f52f]" aria-hidden="true" />
                    <h2 className={`mt-3 text-base font-bold ${palette.text}`}>No tournaments match these filters</h2>
                    <p className={`mt-1 text-sm ${palette.muted}`}>Try another level, format, or month.</p>
                </div>
            )}
        </section>
    );
}