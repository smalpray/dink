import { useState } from 'react';
import MainLayout from '@/app/components/layout/MainLayout';
import CardEventSection from './sections/CardEventSection';
import HeaderSection from './sections/HeaderSection';
import RankingButtonSection from './sections/RankingButtonSection';
import TabsSection from './sections/TabsSection';
import ViewEventSection from './sections/ViewEventSection';

const EVENTS = [
    {
        id: 'cebu-open',
        title: 'Cebu Open 2026',
        date: 'Sat, Nov 14 – Nov 15',
        location: 'Kasambagan Sports Hub',
        format: 'Doubles · Mixed',
        levels: ['Intermediate', 'Advanced'],
        division: 'Doubles',
        month: 'Nov',
        status: 'Upcoming',
        prize: 300000,
        entry: 2500,
        slots: 17,
        image: '/images/sports-5.webp',
        shortDate: 'Nov 14',
    },
    {
        id: 'queen-city',
        title: 'Queen City Doubles Classic',
        date: 'Sat, Nov 28',
        location: 'The Kitchen at IT Park',
        format: 'Doubles',
        levels: ['Beginner', 'Intermediate'],
        division: 'Doubles',
        month: 'Nov',
        status: 'Upcoming',
        prize: 150000,
        entry: 1800,
        slots: 14,
        image: '/images/sports-4.webp',
        shortDate: 'Nov 28',
    },
    {
        id: 'sunset-bash',
        title: 'SRP Sunset Mixed Bash',
        date: 'Sun, Dec 6',
        location: 'SRP Seaside Courts',
        format: 'Mixed · Singles',
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        division: 'Mixed',
        month: 'Dec',
        status: 'Upcoming',
        prize: 50000,
        entry: 1000,
        slots: 17,
        image: '/images/sports-3.webp',
        shortDate: 'Dec 6',
    },
    {
        id: 'sky-court',
        title: 'Skycourt Thursday Showdown',
        date: 'Thu, Oct 22',
        location: 'Ayala Skycourt',
        format: 'Doubles',
        levels: ['Intermediate'],
        division: 'Doubles',
        month: 'Oct',
        status: 'Live',
        prize: 25000,
        entry: 800,
        slots: 0,
        image: '/images/sports-1.webp',
        shortDate: 'Oct 22',
    },
    {
        id: 'summer-smash',
        title: 'Cebu Summer Smash',
        date: 'Sun, Sep 20',
        location: 'Mandaue Sports Center',
        format: 'Singles',
        levels: ['Beginner', 'Intermediate'],
        division: 'Singles',
        month: 'Sep',
        status: 'Past',
        prize: 35000,
        entry: 700,
        slots: 0,
        image: '/images/sports-2.webp',
        shortDate: 'Sep 20',
    },
];

function EventsContent({ darkMode }) {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [detailTab, setDetailTab] = useState('Bracket');
    const [status, setStatus] = useState('Upcoming');
    const [level, setLevel] = useState('All levels');
    const [division, setDivision] = useState('All formats');
    const [month, setMonth] = useState('All months');

    const openEvent = (event, tab = 'Bracket') => {
        setSelectedEvent(event);
        setDetailTab(tab);
    };

    return (
        <div className={`min-h-screen flex-1 overflow-y-auto pb-10 pt-16 transition-colors lg:h-full lg:min-h-0 lg:pt-0 ${darkMode ? 'bg-[#07140f] text-[#e8f0eb]' : 'bg-[#f5f7f3] text-slate-900'}`}>
            <main className="mx-auto w-full max-w-[1120px] px-4 py-6 sm:px-7 lg:px-8 lg:py-7">
                {selectedEvent ? (
                    <ViewEventSection
                        darkMode={darkMode}
                        event={selectedEvent}
                        activeTab={detailTab}
                        onTabChange={setDetailTab}
                        onBack={() => setSelectedEvent(null)}
                    />
                ) : (
                    <>
                        <HeaderSection
                            darkMode={darkMode}
                            status={status}
                            level={level}
                            onLevelChange={setLevel}
                            division={division}
                            onDivisionChange={setDivision}
                            month={month}
                            onMonthChange={setMonth}
                            onShowRankings={() => openEvent(EVENTS[3], 'Cebu rankings')}
                        />
                        <TabsSection
                            darkMode={darkMode}
                            activeTab={status}
                            tabs={['Upcoming', 'Live', 'Past']}
                            onTabChange={setStatus}
                        />
                        <CardEventSection
                            darkMode={darkMode}
                            events={EVENTS}
                            status={status}
                            level={level}
                            division={division}
                            month={month}
                            onSelect={(event) => openEvent(event)}
                        />
                    </>
                )}
            </main>
        </div>
    );
}

export default function EventPage() {
    return (
        <MainLayout
            title="Events"
            subtitle="Tournaments and local rankings"
            fullContent={({ darkMode }) => <EventsContent darkMode={darkMode} />}
        />
    );
}