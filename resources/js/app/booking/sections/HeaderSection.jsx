export default function HeaderSection({ darkMode }) {
    return (
        <header className="mb-4">
            <h1 className={`text-2xl font-extrabold tracking-tight ${darkMode ? 'text-[#eff5f0]' : 'text-slate-900'}`}>
                My bookings
            </h1>
            <p className={`mt-1 text-xs sm:text-sm ${darkMode ? 'text-[#91aa9a]' : 'text-slate-600'}`}>
                Passes, reschedules, and your play history.
            </p>
        </header>
    );
}