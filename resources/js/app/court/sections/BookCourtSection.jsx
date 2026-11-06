import { Link } from '@inertiajs/react';
import { divIcon } from 'leaflet';
import {
    ArrowLeft,
    CheckCircle2,
    Clock3,
    Heart,
    MapPin,
    Navigation,
    Star,
    Trophy,
} from 'lucide-react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

const GALLERY_IMAGES = [
    '/images/sports-1.webp',
    '/images/sports-2.webp',
    '/images/sports-3.webp',
    '/images/sports-4.webp',
    '/images/sports-5.webp',
];

const LOCATION_ICON = divIcon({
    className: 'court-location-marker',
    html: '<span style="display:block;width:18px;height:18px;border:4px solid #d6f52f;border-radius:9999px;background:#0b2117;box-shadow:0 0 0 5px rgba(214,245,47,.22)"></span>',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
});

export default function BookCourtSection({
    court,
    darkMode = false,
    isSaved = false,
    onBack = () => {},
    onBookSlot = () => {},
    onToggleSaved = () => {},
}) {
    const galleryImages = [
        court.image,
        ...GALLERY_IMAGES.filter((image) => image !== court.image).slice(0, 2),
    ];
    const availableTimes = court.availableSlots > 0
        ? [
              { time: '10 PM', available: Math.ceil(court.availableSlots / 2) },
              { time: '11 PM', available: Math.floor(court.availableSlots / 2) },
          ].filter((slot) => slot.available > 0)
        : [];
    const palette = darkMode
        ? {
              background: 'bg-[#071b14] text-[#e4eee7]',
              muted: 'text-[#91aa9a]',
              panel: 'border-[#19382b] bg-[#0b2117]',
              softPanel: 'bg-[#102a1e]',
              heading: 'text-[#edf4ef]',
              accent: 'text-[#d6f52f]',
              map: 'border-[#19382b]',
          }
        : {
              background: 'bg-[#f4f1ec] text-slate-900',
              muted: 'text-slate-600',
              panel: 'border-[#dce2d4] bg-white',
              softPanel: 'bg-[#edf1e8]',
              heading: 'text-slate-900',
              accent: 'text-[#365a1f]',
              map: 'border-[#dce2d4]',
          };

    return (
        <section className={`min-h-screen flex-1 overflow-y-auto transition-colors lg:min-h-0 ${palette.background}`}>
            <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
                <div className="grid grid-cols-1 gap-2.5 md:grid-cols-[minmax(0,1.8fr)_minmax(220px,0.9fr)]">
                    <div className="h-56 overflow-hidden rounded-2xl sm:h-72 md:h-[290px] lg:h-[360px]">
                        <img
                            src={galleryImages[0]}
                            alt={`${court.name} main court`}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 md:grid-cols-1">
                        {galleryImages.slice(1).map((image, index) => (
                            <div
                                key={image}
                                className="h-36 overflow-hidden rounded-2xl sm:h-44 md:h-[140px] lg:h-[174px]"
                            >
                                <img
                                    src={image}
                                    alt={`${court.name} gallery view ${index + 2}`}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
                    <div className="min-w-0">
                        <div className="flex items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={onBack}
                                className={`inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f] ${darkMode ? 'text-[#91aa9a] hover:text-[#d6f52f]' : 'text-slate-600 hover:text-[#365a1f]'}`}
                            >
                                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                                All courts
                            </button>
                            <button
                                type="button"
                                onClick={() => onToggleSaved(court.name)}
                                aria-label={`${isSaved ? 'Remove' : 'Save'} ${court.name}`}
                                aria-pressed={isSaved}
                                className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f] ${palette.muted} hover:bg-white/10`}
                            >
                                <Heart
                                    className={`h-5 w-5 ${isSaved ? 'fill-[#d6f52f] text-[#d6f52f]' : ''}`}
                                    aria-hidden="true"
                                />
                            </button>
                        </div>

                        <p className={`mt-1 text-[11px] font-bold uppercase tracking-[0.16em] ${palette.accent}`}>
                            {court.type} · Pickleball courts
                        </p>
                        <h1 className={`mt-1 text-3xl font-bold leading-tight tracking-tight sm:text-4xl ${palette.heading}`}>
                            {court.name}
                        </h1>
                        <div className={`mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs ${palette.muted}`}>
                            <span className="inline-flex items-center gap-1">
                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                                <strong className={palette.heading}>{court.rating}</strong> ({court.reviews})
                            </span>
                            <span className="inline-flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                                {court.distance} · {court.travelTime}
                            </span>
                            <span>{court.courtCount} courts</span>
                            <span className="inline-flex items-center gap-1 font-semibold text-emerald-500">
                                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                                {court.availableSlots > 0
                                    ? `${court.availableSlots} slots open now`
                                    : 'No slots open now'}
                            </span>
                        </div>

                        <section aria-labelledby="open-today-heading" className="mt-7">
                            <div className="flex items-center justify-between gap-3">
                                <h2 id="open-today-heading" className={`text-lg font-bold ${palette.heading}`}>
                                    Open today
                                </h2>
                                <Link
                                    href="/bookings"
                                    className={`min-h-11 inline-flex items-center rounded-lg px-2 text-xs font-bold ${palette.accent} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]`}
                                >
                                    Full schedule
                                </Link>
                            </div>
                            {availableTimes.length > 0 ? (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {availableTimes.map((slot) => (
                                        <Link
                                            key={slot.time}
                                            href="/bookings"
                                            aria-label={`${slot.time}, ${slot.available} slots open`}
                                            className={`flex min-h-[68px] min-w-[82px] flex-col items-center justify-center rounded-xl border px-3 py-2 transition-colors hover:border-[#d6f52f]/60 ${palette.panel} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]`}
                                        >
                                            <span className={`text-sm font-bold ${palette.heading}`}>{slot.time}</span>
                                            <span className="mt-0.5 text-[11px] text-emerald-500">
                                                {slot.available} open
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className={`mt-2 rounded-xl border p-4 text-sm ${palette.panel} ${palette.muted}`}>
                                    There are no available slots today. Check the full schedule for upcoming availability.
                                </p>
                            )}
                        </section>

                        <section aria-labelledby="about-heading" className="mt-7">
                            <h2 id="about-heading" className={`text-lg font-bold ${palette.heading}`}>
                                About
                            </h2>
                            <p className={`mt-2 max-w-3xl text-sm leading-6 ${palette.muted}`}>
                                {court.description}
                            </p>
                            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                                {court.amenities.map(({ name, icon: Amenity }) => (
                                    <div
                                        key={name}
                                        className={`flex min-h-10 items-center gap-2 rounded-xl px-3 text-xs font-medium ${palette.softPanel} ${palette.heading}`}
                                    >
                                        <Amenity className={`h-3.5 w-3.5 shrink-0 ${palette.accent}`} aria-hidden="true" />
                                        {name}
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section aria-labelledby="tournaments-heading" className="mt-7">
                            <h2 id="tournaments-heading" className={`text-lg font-bold ${palette.heading}`}>
                                Tournaments here
                            </h2>
                            <div className={`mt-2 flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 ${palette.panel}`}>
                                <div className="flex min-w-0 items-center gap-3">
                                    <Trophy className={`h-5 w-5 shrink-0 ${palette.accent}`} aria-hidden="true" />
                                    <div className="min-w-0">
                                        <p className={`truncate text-sm font-semibold ${palette.heading}`}>
                                            Queen City Doubles Classic
                                        </p>
                                        <p className={`text-xs ${palette.muted}`}>Sat, Nov 28</p>
                                    </div>
                                </div>
                                <span className={`shrink-0 text-sm font-bold ${palette.heading}`}>₱150K</span>
                            </div>
                        </section>

                        <section aria-labelledby="location-heading" className="mt-7 pb-6">
                            <h2 id="location-heading" className={`text-lg font-bold ${palette.heading}`}>
                                Location
                            </h2>
                            <p className={`mt-1 text-xs ${palette.muted}`}>{court.address}</p>
                            <div className={`mt-2 h-44 overflow-hidden rounded-2xl border ${palette.map}`}>
                                <MapContainer
                                    center={court.coordinates}
                                    zoom={15}
                                    scrollWheelZoom={false}
                                    className="h-full w-full"
                                    aria-label={`Map showing the location of ${court.name}`}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={court.coordinates} icon={LOCATION_ICON} />
                                </MapContainer>
                            </div>
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${court.coordinates.join(',')}`}
                                target="_blank"
                                rel="noreferrer"
                                className={`mt-2 inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors hover:bg-white/5 ${palette.panel} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]`}
                            >
                                <Navigation className="h-4 w-4" aria-hidden="true" />
                                Directions
                            </a>
                        </section>
                    </div>

                    <aside className={`rounded-2xl border p-4 lg:sticky lg:top-6 ${palette.panel}`}>
                        <p className={`text-3xl font-bold tracking-tight ${palette.heading}`}>
                            {court.price}
                            <span className={`ml-1 text-sm font-medium ${palette.muted}`}>/hr</span>
                        </p>
                        <p className={`mt-1 flex items-center gap-1 text-[11px] ${palette.muted}`}>
                            <Clock3 className="h-3 w-3 text-amber-400" aria-hidden="true" />
                            Peak {court.peakPrice} · 5–9 PM
                        </p>
                        <p className={`mt-4 text-xs ${palette.muted}`}>{court.openHours}</p>
                        <button
                            type="button"
                            onClick={onBookSlot}
                            className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#d6f52f] px-4 text-sm font-bold text-[#0b2117] shadow-[0_8px_24px_rgba(214,245,47,0.14)] transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(214,245,47,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2117]"
                        >
                            Book a slot
                        </button>
                        <p className={`mt-2 text-center text-[10px] ${palette.muted}`}>
                            Free cancellation up to 24 hours before
                        </p>
                    </aside>
                </div>
            </div>
        </section>
    );
}
