import { useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';
import { MapPin } from 'lucide-react';
import MainLayout from '@/app/components/layout/MainLayout';
import BookCardSection from './sections/BookCardSection';
import CancelSection from './sections/CancelSection';
import CheckInSection from './sections/CheckInSection';
import HeaderSection from './sections/HeaderSection';
import RecheduleSection from './sections/RecheduleSection';
import TabsSection from './sections/TabsSection';

const INITIAL_BOOKINGS = [
    {
        id: 'booking-1',
        venue: 'The Kitchen at IT Park',
        date: 'Nov 3',
        weekday: 'Tue',
        time: '8 PM – 9 PM',
        court: 'Court 3',
        players: 4,
        price: 1240,
        status: 'Confirmed',
        passLive: true,
        code: 'DZ-7KQ2M',
        upcoming: true,
    },
    {
        id: 'booking-2',
        venue: 'Ayala Skycourt',
        date: 'Nov 6',
        weekday: 'Fri',
        time: '5 PM – 7 PM',
        court: 'Court 2',
        players: 4,
        price: 1500,
        status: 'Confirmed',
        passLive: false,
        code: 'DZ-4P8LX',
        upcoming: true,
    },
    {
        id: 'booking-3',
        venue: 'SRP Seaside Courts',
        date: 'Oct 30',
        weekday: 'Fri',
        time: '7 PM – 8 PM',
        court: 'Court 1',
        players: 2,
        price: 800,
        status: 'Completed',
        code: 'DZ-2N6RB',
        upcoming: false,
    },
    {
        id: 'booking-4',
        venue: 'Cebu Pickleball Club',
        date: 'Oct 26',
        weekday: 'Mon',
        time: '6 PM – 7 PM',
        court: 'Court 4',
        players: 4,
        price: 1100,
        status: 'Completed',
        code: 'DZ-9C3VT',
        upcoming: false,
    },
    {
        id: 'booking-5',
        venue: 'The Kitchen at IT Park',
        date: 'Oct 22',
        weekday: 'Thu',
        time: '8 PM – 9 PM',
        court: 'Court 1',
        players: 4,
        price: 1240,
        status: 'Completed',
        code: 'DZ-5H8MX',
        upcoming: false,
    },
];

function BookingsContent({ darkMode }) {
    const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
    const [activeTab, setActiveTab] = useState('Upcoming');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [activeAction, setActiveAction] = useState(null);
    const [notice, setNotice] = useState('');

    const upcomingBookings = useMemo(
        () => bookings.filter((booking) => booking.upcoming),
        [bookings],
    );
    const pastBookings = useMemo(
        () => bookings.filter((booking) => !booking.upcoming),
        [bookings],
    );
    const visibleBookings = activeTab === 'Upcoming' ? upcomingBookings : pastBookings;
    const counts = {
        Upcoming: upcomingBookings.length,
        Past: pastBookings.length,
    };

    const closeAction = () => {
        setActiveAction(null);
        setSelectedBooking(null);
    };

    const updateBooking = (bookingId, updates) => {
        setBookings((current) =>
            current.map((booking) =>
                booking.id === bookingId ? { ...booking, ...updates } : booking,
            ),
        );
    };

    const handleCancel = () => {
        if (!selectedBooking) {
            return;
        }

        setBookings((current) => current.filter((booking) => booking.id !== selectedBooking.id));
        setNotice(`${selectedBooking.venue} booking cancelled.`);
        closeAction();
    };

    const handleReschedule = ({ date, weekday, time }) => {
        if (!selectedBooking) {
            return;
        }

        updateBooking(selectedBooking.id, { date, weekday, time, passLive: false });
        setNotice(`Booking rescheduled to ${date}, ${time}.`);
        closeAction();
    };

    const handleCheckIn = () => {
        if (!selectedBooking) {
            return;
        }

        updateBooking(selectedBooking.id, { passLive: false });
        setNotice('Gate scan simulated. Check-in complete.');
    };

    return (
        <div className={`min-h-screen flex-1 overflow-y-auto pb-10 pt-16 transition-colors lg:h-full lg:min-h-0 lg:pt-0 ${darkMode ? 'bg-[#07140f] text-[#e8f0eb]' : 'bg-[#f5f7f3] text-slate-900'}`}>
            <main className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-0">
                <HeaderSection darkMode={darkMode} />
                <TabsSection
                    darkMode={darkMode}
                    activeTab={activeTab}
                    counts={counts}
                    onTabChange={(tab) => {
                        setActiveTab(tab);
                        setNotice('');
                    }}
                />
                <section aria-label={`${activeTab} bookings`} className="space-y-2.5 pt-4">
                    {visibleBookings.length ? (
                        visibleBookings.map((booking) => (
                            <BookCardSection
                                key={booking.id}
                                booking={booking}
                                darkMode={darkMode}
                                onCheckIn={() => {
                                    setSelectedBooking(booking);
                                    setActiveAction('checkin');
                                }}
                                onReschedule={() => {
                                    setSelectedBooking(booking);
                                    setActiveAction('reschedule');
                                }}
                                onCancel={() => {
                                    setSelectedBooking(booking);
                                    setActiveAction('cancel');
                                }}
                            />
                        ))
                    ) : (
                        <div className={`rounded-2xl border px-5 py-10 text-center ${darkMode ? 'border-[#19382b] bg-[#0b2117]' : 'border-[#dfe5da] bg-white'}`}>
                            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#d6f52f] text-[#0b2117]">
                                <MapPin className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <h2 className={`mt-3 text-base font-bold ${darkMode ? 'text-[#edf4ef]' : 'text-slate-900'}`}>
                                {activeTab === 'Upcoming' ? 'No upcoming bookings' : 'No past bookings yet'}
                            </h2>
                            <p className={`mt-1 text-sm ${darkMode ? 'text-[#8eaa99]' : 'text-slate-500'}`}>
                                {activeTab === 'Upcoming'
                                    ? 'Your next court reservation will appear here.'
                                    : 'Completed games will appear here.'}
                            </p>
                            <Link
                                href="/courts"
                                className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-[#d6f52f] px-4 text-xs font-bold text-[#0b2117] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(214,245,47,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]"
                            >
                                Find a court
                            </Link>
                        </div>
                    )}
                </section>
                {notice && (
                    <p
                        role="status"
                        className={`mt-4 rounded-xl border px-4 py-3 text-sm ${darkMode ? 'border-[#27583a] bg-[#0c2b1d] text-[#a3e6ba]' : 'border-[#cfe6d4] bg-[#f0faf2] text-[#23683c]'}`}
                    >
                        {notice}
                    </p>
                )}
            </main>

            {activeAction === 'checkin' && selectedBooking && (
                <CheckInSection
                    booking={selectedBooking}
                    darkMode={darkMode}
                    onClose={closeAction}
                    onSimulateScan={handleCheckIn}
                />
            )}
            {activeAction === 'reschedule' && selectedBooking && (
                <RecheduleSection
                    booking={selectedBooking}
                    darkMode={darkMode}
                    onClose={closeAction}
                    onReschedule={handleReschedule}
                />
            )}
            {activeAction === 'cancel' && selectedBooking && (
                <CancelSection
                    booking={selectedBooking}
                    darkMode={darkMode}
                    onClose={closeAction}
                    onConfirm={handleCancel}
                />
            )}
        </div>
    );
}

export default function BookingsPage() {
    return (
        <MainLayout
            title="My bookings"
            subtitle="Passes, reschedules, and your play history."
            fullContent={({ darkMode }) => <BookingsContent darkMode={darkMode} />}
        />
    );
}