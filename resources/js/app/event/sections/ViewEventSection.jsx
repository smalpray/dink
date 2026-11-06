import {
    ArrowLeft,
    CalendarDays,
    Check,
    MapPin,
    Medal,
} from 'lucide-react';
import RankingButtonSection from './RankingButtonSection';
import TabsSection from './TabsSection';

const TEAMS = [
    ['Kitchen Kings', 'Paolo Reyes & Kenji Abellana', '4.8'],
    ['Lechon Lobbers', 'Trish Mendoza & Carlo Villamor', '4.5'],
    ['Sugbo Smash', 'Rafa Dizon & Gelo Sarmiento', '4.4'],
    ['Dink Responsibly', 'Bea Gonzales & Nina Ocampo', '4.3'],
    ['Third Shot Drop', 'Mark Tan & Ian Cabrera', '4.2'],
    ['Erne & Bert', 'Migs Villanueva & Ben Dizon', '4.1'],
    ['Mango Volley', 'Ana Lim & Joy Pascual', '4.0'],
    ['Net Results', 'Dane Kho & Mike Torres', '3.9'],
];

const QUARTERFINALS = [
    { court: 'Court 1', time: '5:00 PM', a: 'Kitchen Kings', b: 'Net Results', seedA: '1', seedB: '8', scoresA: ['11', '11'], scoresB: ['6', '8'], winner: 'a' },
    { court: 'Court 2', time: '5:00 PM', a: 'Dink Responsibly', b: 'Third Shot Drop', seedA: '4', seedB: '5', scoresA: ['9', '11', '11'], scoresB: ['11', '7', '9'], winner: 'a' },
    { court: 'Court 3', time: '5:00 PM', a: 'Sugbo Smash', b: 'Erne & Bert', seedA: '3', seedB: '6', scoresA: ['11', '12'], scoresB: ['5', '10'], winner: 'a' },
    { court: 'Court 4', time: '5:00 PM', a: 'Lechon Lobbers', b: 'Mango Volley', seedA: '2', seedB: '7', scoresA: ['11', '11'], scoresB: ['3', '9'], winner: 'a' },
];

const SEMIFINALS = [
    { court: 'Court 1', time: '7:00 PM', a: 'Kitchen Kings', b: 'Dink Responsibly', seedA: '1', seedB: '4', scoresA: ['11', '8'], scoresB: ['8', '9'], live: true },
    { court: 'Court 2', time: '7:00 PM', a: 'Sugbo Smash', b: 'Lechon Lobbers', seedA: '3', seedB: '2', scoresA: ['6'], scoresB: ['5'], live: true },
];

function SectionTitle({ children, darkMode, aside }) {
    return (
        <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className={`text-lg font-bold tracking-tight ${darkMode ? 'text-[#edf4ef]' : 'text-slate-900'}`}>{children}</h2>
            {aside}
        </div>
    );
}

function MatchCard({ match, darkMode, live = false }) {
    const box = darkMode ? 'border-[#19382b] bg-[#0b2117]' : 'border-[#dfe5da] bg-white';
    const muted = darkMode ? 'text-[#8eaa99]' : 'text-slate-500';
    const main = darkMode ? 'text-[#e7f0e9]' : 'text-slate-800';

    return (
        <article className={`overflow-hidden rounded-xl border ${live ? 'ring-1 ring-[#9dbbdb]' : ''} ${box}`}>
            <div className={`flex items-center justify-between gap-2 px-3 py-1.5 text-[9px] ${darkMode ? 'bg-[#102a1e]' : 'bg-[#f3f7f2]'}`}>
                <span className={muted}>{match.court} · {match.time}</span>
                {match.live && <span className="font-bold text-[#ff7777]">● LIVE</span>}
            </div>
            {[['a', match.a, match.seedA, match.scoresA], ['b', match.b, match.seedB, match.scoresB]].map(([side, team, seed, scores]) => {
                const isWinner = match.winner === side;

                return (
                    <div key={side} className={`grid grid-cols-[1rem_minmax(0,1fr)_auto] items-center gap-2 border-t px-2.5 py-2 text-[10px] ${darkMode ? 'border-[#19382b]' : 'border-[#e7ece5]'}`}>
                        <span className={muted}>{seed}</span>
                        <span className={`truncate ${isWinner ? `font-semibold ${main}` : muted}`}>{team}</span>
                        <span className={`flex gap-1 font-mono ${isWinner ? 'font-bold text-[#d6f52f]' : muted}`}>
                            {scores?.length ? scores.map((score, index) => <span key={`${side}-${index}`}>{score}</span>) : <span>TBD</span>}
                        </span>
                    </div>
                );
            })}
        </article>
    );
}

function Bracket({ darkMode }) {
    const muted = darkMode ? 'text-[#8eaa99]' : 'text-slate-500';

    return (
        <section aria-label="Live tournament bracket">
            <p className="mb-4 text-[10px] font-semibold text-[#ff7777]">● &nbsp;Scores update live</p>
            <div className="grid gap-5 md:min-w-[720px] md:grid-cols-[1fr_1fr_1fr] md:gap-6">
                <div>
                    <h3 className={`mb-2.5 text-[9px] font-bold uppercase tracking-[0.18em] ${muted}`}>Quarterfinals</h3>
                    <div className="space-y-2.5">
                        {QUARTERFINALS.map((match) => <MatchCard key={match.court} match={match} darkMode={darkMode} />)}
                    </div>
                </div>
                <div className="space-y-12">
                    <h3 className={`mb-2.5 text-[9px] font-bold uppercase tracking-[0.18em] ${muted}`}>Semifinals</h3>
                    {SEMIFINALS.map((match) => <MatchCard key={match.court} match={match} darkMode={darkMode} live />)}
                </div>
                <div>
                    <h3 className={`mb-2.5 text-[9px] font-bold uppercase tracking-[0.18em] ${muted}`}>Final</h3>
                    <div className="mt-16">
                        <MatchCard match={{ court: 'Court 1', time: '8:30 PM', a: 'TBD', b: 'TBD' }} darkMode={darkMode} />
                    </div>
                </div>
            </div>
        </section>
    );
}

function PrizeBreakdown({ darkMode }) {
    const amounts = [
        ['1st place', '₱12,500', 'w-full'],
        ['2nd place', '₱7,500', 'w-3/5'],
        ['3rd place', '₱5,000', 'w-2/5'],
    ];

    return (
        <section>
            <SectionTitle darkMode={darkMode}>Prize breakdown</SectionTitle>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {amounts.map(([place, amount, width], index) => (
                    <div key={place} className={`rounded-2xl border p-3 ${index === 0 ? 'border-[#d6f52f] bg-[#10382a]' : darkMode ? 'border-[#19382b] bg-[#0b2117]' : 'border-[#dfe5da] bg-white'}`}>
                        <p className={`text-[9px] font-bold uppercase tracking-[0.14em] ${index === 0 ? 'text-[#d6f52f]' : darkMode ? 'text-[#8eaa99]' : 'text-slate-500'}`}>{place}</p>
                        <p className={`mt-1 text-xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{amount}</p>
                        <div className={`mt-2 h-1 rounded-full ${darkMode ? 'bg-[#183324]' : 'bg-[#e6ede3]'}`}>
                            <div className={`h-full rounded-full ${width} ${index === 0 ? 'bg-[#d6f52f]' : 'bg-[#328b69]'}`} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function ScheduleCard({ darkMode }) {
    const items = [['5:00 PM', 'Quarterfinals'], ['7:00 PM', 'Semifinals'], ['8:30 PM', 'Final']];
    return (
        <section className={`rounded-2xl border p-4 ${darkMode ? 'border-[#19382b] bg-[#0b2117]' : 'border-[#dfe5da] bg-white'}`}>
            <h2 className={`mb-3 text-xs font-bold ${darkMode ? 'text-[#edf4ef]' : 'text-slate-900'}`}>Schedule</h2>
            <div className="space-y-3">
                {items.map(([time, name]) => (
                    <div key={name} className="relative flex gap-3 pl-1">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#328b69]" />
                        <div>
                            <p className={`text-[9px] ${darkMode ? 'text-[#8eaa99]' : 'text-slate-500'}`}>{time}</p>
                            <p className={`text-[10px] font-medium ${darkMode ? 'text-[#dce8df]' : 'text-slate-700'}`}>{name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function VenueCard({ darkMode, event }) {
    return (
        <section className={`overflow-hidden rounded-2xl border ${darkMode ? 'border-[#19382b] bg-[#0b2117]' : 'border-[#dfe5da] bg-white'}`}>
            <div className="relative h-36 bg-[#14251d]">
                <img src="/images/sports-5.webp" alt="" className="h-full w-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07140f]/90 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs font-semibold text-white">
                    <MapPin className="h-4 w-4 text-[#d6f52f]" aria-hidden="true" />
                    Cebu, Philippines
                </div>
            </div>
            <div className="p-3.5">
                <h2 className={`text-xs font-bold ${darkMode ? 'text-[#edf4ef]' : 'text-slate-900'}`}>{event.location}</h2>
                <p className={`mt-1 text-[10px] leading-relaxed ${darkMode ? 'text-[#8eaa99]' : 'text-slate-500'}`}>
                    Level 5, Ayala Center Cebu, Archbishop Reyes Ave
                </p>
                <p className={`mt-2 text-[9px] ${darkMode ? 'text-[#8eaa99]' : 'text-slate-500'}`}>Organized by {event.location}</p>
            </div>
        </section>
    );
}

function EventDetails({ darkMode, event }) {
    const panel = darkMode ? 'border-[#19382b] bg-[#0b2117]' : 'border-[#dfe5da] bg-white';
    const muted = darkMode ? 'text-[#8eaa99]' : 'text-slate-500';

    return (
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_15rem]">
            <div className="space-y-7">
                <section>
                    <SectionTitle darkMode={darkMode} aside={<span className={`text-xs ${muted}`}>8 teams</span>}>Registered teams</SectionTitle>
                    <div className="grid gap-2 sm:grid-cols-2">
                        {TEAMS.map(([name, players], index) => (
                            <div key={name} className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${panel}`}>
                                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${darkMode ? 'bg-[#102a1e] text-[#d6f52f]' : 'bg-[#edf5e6] text-[#476328]'}`}>{index + 1}</span>
                                <span className="min-w-0 flex-1">
                                    <span className={`block truncate text-[10px] font-semibold ${darkMode ? 'text-[#e7f0e9]' : 'text-slate-800'}`}>{name}</span>
                                    <span className={`block truncate text-[9px] ${muted}`}>{players}</span>
                                </span>
                                <span className={`text-[9px] ${muted}`}>{(4.8 - index * 0.1).toFixed(1)}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <SectionTitle darkMode={darkMode}>Rules</SectionTitle>
                    <ul className={`space-y-2 rounded-2xl border p-4 text-[10px] leading-relaxed ${panel} ${muted}`}>
                        <li className="flex gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-[#d6f52f]" /> Rally scoring to 11, win by 2. Finals are best of three games to 15.</li>
                        <li className="flex gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-[#d6f52f]" /> USA Pickleball 2026 rulebook applies; official referees for semifinals and finals.</li>
                        <li className="flex gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-[#d6f52f]" /> Approved paddles only. Paddles are checked at registration.</li>
                        <li className="flex gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-[#d6f52f]" /> Teams must check in with their QR pass 30 minutes before the first match.</li>
                    </ul>
                </section>

                <section>
                    <SectionTitle darkMode={darkMode}>Sponsors</SectionTitle>
                    <div className="flex flex-wrap gap-2">
                        {['Ayala Malls', 'Pocari Sweat'].map((sponsor) => (
                            <span key={sponsor} className={`rounded-xl border px-3 py-2 text-[10px] font-semibold ${panel} ${darkMode ? 'text-[#c2d2c8]' : 'text-slate-600'}`}>{sponsor}</span>
                        ))}
                    </div>
                </section>
            </div>
            <div className="space-y-3">
                <ScheduleCard darkMode={darkMode} />
                <VenueCard darkMode={darkMode} event={event} />
                <button
                    type="button"
                    onClick={() => document.getElementById('bracket')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#d6f52f] px-4 py-3 text-xs font-bold text-[#0b2117] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(214,245,47,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07140f]"
                >
                    <Medal className="h-4 w-4" aria-hidden="true" />
                    Watch live bracket
                </button>
            </div>
        </div>
    );
}

export default function ViewEventSection({ darkMode, event, activeTab, onTabChange, onBack }) {
    const isLive = event.status === 'Live';
    const title = event.id === 'sky-court' ? 'Skycourt Thursday Showdown' : event.title;
    const tabOptions = ['Bracket', 'Cebu rankings'];
    const muted = darkMode ? 'text-[#8eaa99]' : 'text-slate-600';

    return (
        <div>
            <section className="relative -mx-4 -mt-6 overflow-hidden px-4 py-6 sm:-mx-7 sm:px-7 lg:-mx-8 lg:-mt-7 lg:px-8">
                <img src={event.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07140f]/95 via-[#07140f]/80 to-[#07140f]/50" />
                <div className="relative mx-auto grid max-w-[1120px] gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                        <button
                            type="button"
                            onClick={onBack}
                            aria-label="Back to tournaments"
                            className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#07140f]/70 text-white transition-colors hover:bg-[#183526] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]"
                        >
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold text-white ${isLive ? 'bg-[#ff6969]' : 'bg-[#173b2b]'}`}>
                                {isLive ? '● LIVE NOW' : 'TOURNAMENT'}
                            </span>
                            <span className="rounded-full bg-[#102a1e]/90 px-2.5 py-1 text-[9px] font-semibold text-[#e4eee7]">{event.format}</span>
                            {event.levels.map((item) => <span key={item} className="rounded-full bg-[#102a1e]/90 px-2.5 py-1 text-[9px] font-semibold text-[#e4eee7]">{item}</span>)}
                        </div>
                        <h1 className="max-w-3xl text-3xl font-black leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h1>
                        <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-slate-200">
                            <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3 w-3" aria-hidden="true" />{event.date}</span>
                            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3 w-3" aria-hidden="true" />{event.location}</span>
                        </p>
                    </div>
                    <div className="lg:pb-1">
                        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#b8cdbf]">Prize pool</p>
                        <p className="text-4xl font-black tracking-tight text-[#d6f52f] sm:text-5xl">{`₱${event.prize.toLocaleString()}`}</p>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-[920px] pt-6">
                <TabsSection darkMode={darkMode} activeTab={activeTab} tabs={tabOptions} onTabChange={onTabChange} />
                {activeTab === 'Cebu rankings' ? (
                    <section className="pt-5">
                        <div className="mb-4">
                            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#d6f52f]">● Live</p>
                            <h2 className={`mt-1 text-lg font-bold ${darkMode ? 'text-[#edf4ef]' : 'text-slate-900'}`}>{title}</h2>
                            <p className={`mt-1 text-xs ${muted}`}>3.5–4.0 Doubles · {`₱${event.prize.toLocaleString()}`} prize pool</p>
                        </div>
                        <RankingButtonSection darkMode={darkMode} />
                    </section>
                ) : (
                    <div className="space-y-7 pt-6">
                        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_15rem]">
                            <div className="space-y-7">
                                <PrizeBreakdown darkMode={darkMode} />
                                <section>
                                    <SectionTitle darkMode={darkMode}>Divisions</SectionTitle>
                                    <div className={`flex items-center gap-4 rounded-2xl border p-3 ${darkMode ? 'border-[#19382b] bg-[#0b2117]' : 'border-[#dfe5da] bg-white'}`}>
                                        <span className="min-w-0 flex-1">
                                            <span className={`block text-xs font-bold ${darkMode ? 'text-[#e7f0e9]' : 'text-slate-800'}`}>3.5–4.0 {event.division}</span>
                                            <span className={`block text-[9px] ${muted}`}>{event.levels.join(' · ')} · {event.division}</span>
                                        </span>
                                        <span className="w-24">
                                            <span className="block h-1.5 rounded-full bg-[#183324]"><span className="block h-full w-full rounded-full bg-[#328b69]" /></span>
                                            <span className="mt-1 block text-right text-[9px] font-bold text-[#d6f52f]">Full</span>
                                        </span>
                                    </div>
                                </section>
                            </div>
                            <ScheduleCard darkMode={darkMode} />
                        </div>

                        <section id="bracket" className="scroll-mt-6">
                            <SectionTitle
                                darkMode={darkMode}
                                aside={
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById('bracket')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                                        className="text-[10px] font-semibold text-[#d6f52f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]"
                                    >
                                        Full bracket
                                    </button>
                                }
                            >
                                Bracket
                            </SectionTitle>
                            <div className="overflow-x-auto pb-2">
                                <Bracket darkMode={darkMode} />
                            </div>
                        </section>

                        <EventDetails darkMode={darkMode} event={event} />
                    </div>
                )}
            </div>
        </div>
    );
}