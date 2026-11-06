import { CalendarDays, ChevronDown, Trophy } from 'lucide-react';
import Button from '@/app/components/Button';

const controlClass = 'inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]';

export default function HeaderSection({
    darkMode,
    status,
    level,
    onLevelChange,
    division,
    onDivisionChange,
    month,
    onMonthChange,
    onShowRankings,
}) {
    const palette = darkMode
        ? {
              text: 'text-[#eff5f0]',
              muted: 'text-[#8eaa99]',
              chip: 'border-[#19382b] bg-[#0b2117] text-[#d7e4dc] hover:border-[#496b37]',
              active: 'border-[#d6f52f] bg-[#d6f52f] text-[#0b2117]',
              rule: 'border-[#19382b]',
          }
        : {
              text: 'text-slate-900',
              muted: 'text-slate-600',
              chip: 'border-[#dfe5da] bg-white text-slate-700 hover:border-[#aab8a5]',
              active: 'border-[#badb38] bg-[#d6f52f] text-[#142318]',
              rule: 'border-[#dfe5da]',
          };

    const selectClass = `${controlClass} ${palette.chip} appearance-none pr-2.5`;
    const levels = ['All levels', 'Beginner', 'Intermediate', 'Advanced'];
    const divisions = ['All formats', 'Singles', 'Doubles', 'Mixed'];
    const months = ['All months', 'Oct', 'Nov', 'Dec'];

    return (
        <section>
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${palette.text}`}>
                        Tournaments
                    </h1>
                    <p className={`mt-1 text-xs sm:text-sm ${palette.muted}`}>
                        ₱525,000 in prize money up for grabs in Cebu.
                    </p>
                </div>
                <Button
                    type="button"
                    variant="dinkzone"
                    outlined
                    darkMode={darkMode}
                    size="sm"
                    onClick={onShowRankings}
                    className={`gap-2 rounded-xl px-3 py-2 text-xs font-semibold ${darkMode ? '!border-[#19382b] !bg-[#0b2117] !text-[#d7e4dc] hover:!border-[#496b37]' : '!border-[#dfe5da] !bg-white !text-slate-700 hover:!border-[#aab8a5]'}`}
                >
                    <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
                    Rankings
                </Button>
            </div>

            <div
                className="-mx-1 mb-4 flex flex-nowrap items-center gap-1.5 overflow-x-auto px-1 pb-1 sm:gap-2"
                style={{ scrollbarWidth: 'none' }}
            >
                {levels.map((item) => (
                    <button
                        key={item}
                        type="button"
                        aria-pressed={level === item}
                        onClick={() => onLevelChange(item)}
                        className={`${controlClass} ${level === item ? palette.active : palette.chip}`}
                    >
                        {item}
                    </button>
                ))}
                <span className={`mx-1 h-6 shrink-0 border-l ${palette.rule}`} />
                {divisions.map((item) => (
                    <button
                        key={item}
                        type="button"
                        aria-pressed={division === item}
                        onClick={() => onDivisionChange(item)}
                        className={`${controlClass} ${division === item ? palette.active : palette.chip}`}
                    >
                        {item}
                    </button>
                ))}
                <span className={`mx-1 h-6 shrink-0 border-l ${palette.rule}`} />
                {months.map((item) => (
                    <button
                        key={item}
                        type="button"
                        aria-pressed={month === item}
                        onClick={() => onMonthChange(item)}
                        className={`${controlClass} ${month === item ? palette.active : palette.chip}`}
                    >
                        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                        {item}
                        {item === 'All months' && <ChevronDown className="h-3 w-3" aria-hidden="true" />}
                    </button>
                ))}
            </div>
            <div className="sr-only" aria-live="polite">
                Showing {status.toLowerCase()} tournaments
            </div>
        </section>
    );
}