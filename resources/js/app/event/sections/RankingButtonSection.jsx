import { ArrowDownRight, ArrowUpRight, Minus, Trophy } from 'lucide-react';

const PLAYERS = [
    ['Paolo Reyes', '@paolodinks', '4.71', '48–9', '2,840', 'steady'],
    ['Trish Mendoza', '@trishm', '4.66', '44–11', '2,715', 'up'],
    ['Kenji Abellana', '@kenji.a', '4.58', '41–12', '2,602', 'down'],
    ['Carlo Villamor', '@carlov', '4.51', '39–14', '2,480', 'up'],
    ['Bea Gonzales', '@beagonz', '4.47', '37–15', '2,391', 'steady'],
    ['Rafa Dizon', '@rafad', '4.42', '35–16', '2,288', 'down'],
    ['Gelo Sarmiento', '@gelo', '4.38', '33–17', '2,190', 'up'],
    ['Nina Ocampo', '@ninao', '4.31', '30–18', '2,054', 'up'],
    ['Mark Tan', '@marktan', '4.27', '29–20', '1,987', 'down'],
    ['Ian Cabrera', '@iancab', '4.22', '27–21', '1,910', 'steady'],
];

export default function RankingButtonSection({ darkMode }) {
    const surface = darkMode ? 'border-[#19382b] bg-[#0b2117]' : 'border-[#dfe5da] bg-white';
    const text = darkMode ? 'text-[#e7f0e9]' : 'text-slate-800';
    const muted = darkMode ? 'text-[#8eaa99]' : 'text-slate-500';

    return (
        <section aria-label="Cebu player rankings" className={`overflow-hidden rounded-2xl border ${surface}`}>
            <div className={`grid grid-cols-[2.4rem_minmax(0,1fr)_3.25rem_3.4rem_3.2rem_1.25rem] items-center gap-2 border-b px-3 py-2.5 text-[9px] font-bold uppercase tracking-wider sm:grid-cols-[3rem_minmax(0,1fr)_4.5rem_4.5rem_4.5rem_1.5rem] sm:px-4 ${darkMode ? 'border-[#19382b] bg-[#102a1e] text-[#8eaa99]' : 'border-[#e7ece5] bg-[#f3f7f2] text-slate-500'}`}>
                <span>Rank</span><span>Player</span><span className="text-right">Rating</span><span className="text-right">W-L</span><span className="text-right">Points</span><span />
            </div>
            {PLAYERS.map(([name, handle, rating, record, points, trend], index) => {
                const TrendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Minus;

                return (
                    <div
                        key={handle}
                        className={`grid grid-cols-[2.4rem_minmax(0,1fr)_3.25rem_3.4rem_3.2rem_1.25rem] items-center gap-2 border-b px-3 py-2.5 last:border-0 sm:grid-cols-[3rem_minmax(0,1fr)_4.5rem_4.5rem_4.5rem_1.5rem] sm:px-4 ${darkMode ? 'border-[#19382b]' : 'border-[#e7ece5]'}`}
                    >
                        <span className={`text-sm font-bold ${index === 0 ? 'text-[#d6f52f]' : text}`}>{index + 1}</span>
                        <span className="min-w-0">
                            <span className={`block truncate text-[11px] font-semibold ${text}`}>{name}</span>
                            <span className={`block truncate text-[9px] ${muted}`}>{handle}</span>
                        </span>
                        <span className={`text-right text-[11px] font-semibold ${text}`}>{rating}</span>
                        <span className={`text-right text-[10px] ${muted}`}>{record}</span>
                        <span className={`text-right text-[10px] font-semibold ${text}`}>{points}</span>
                        <TrendIcon aria-hidden="true" className={`h-3.5 w-3.5 ${trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-rose-400' : muted}`} />
                    </div>
                );
            })}
            <div className={`grid grid-cols-[2.4rem_minmax(0,1fr)_3.25rem_3.4rem_3.2rem_1.25rem] items-center gap-2 border-t border-dashed px-3 py-2.5 sm:grid-cols-[3rem_minmax(0,1fr)_4.5rem_4.5rem_4.5rem_1.5rem] sm:px-4 ${darkMode ? 'border-[#37553d] bg-[#0a1e15]' : 'border-[#d4dfd1] bg-[#f8faf6]'}`}>
                <span className={`text-sm font-bold ${text}`}>38</span>
                <span className="min-w-0">
                    <span className={`block truncate text-[11px] font-semibold ${text}`}>Migs Villanueva (you)</span>
                    <span className={`block truncate text-[9px] ${muted}`}>@migsdinks</span>
                </span>
                <span className={`text-right text-[11px] font-semibold ${text}`}>3.72</span>
                <span className={`text-right text-[10px] ${muted}`}>87–55</span>
                <span className={`text-right text-[10px] font-semibold ${text}`}>1,204</span>
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <div className={`flex items-center gap-2 border-t px-3 py-2.5 text-[10px] ${darkMode ? 'border-[#19382b] text-[#8eaa99]' : 'border-[#e7ece5] text-slate-500'}`}>
                <Trophy className="h-3.5 w-3.5 text-[#d6f52f]" aria-hidden="true" />
                Ratings updated after each verified match.
            </div>
        </section>
    );
}