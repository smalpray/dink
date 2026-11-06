import Badge from '@/app/components/Badge';
import {
    CheckCircle2,
    Coffee,
    Droplets,
    Heart,
    Lightbulb,
    MapPin,
    ParkingSquare,
    Snowflake,
    Star,
} from 'lucide-react';

export const COURTS = [
    {
        name: 'Capitol Site Smash Hall',
        location: 'Capitol Site',
        address: 'Capitol Site, Cebu City, Philippines',
        distance: '0.5 km',
        travelTime: '7 min',
        rating: '4.5',
        reviews: 121,
        courtCount: 3,
        price: '₱380',
        peakPrice: '₱480',
        type: 'Indoor',
        image: '/images/sports-1.webp',
        coordinates: [10.3152, 123.8912],
        availableSlots: 8,
        openHours: '6 AM – 12 AM daily',
        description: 'Three indoor courts with cushioned surfaces, bright lighting, and a welcoming clubhouse in the heart of Capitol Site.',
        amenities: [
            { name: 'Night lights', icon: Lightbulb },
            { name: 'Air-conditioned', icon: Snowflake },
            { name: 'Pro shop', icon: Coffee },
            { name: 'Parking', icon: ParkingSquare },
        ],
    },
    {
        name: 'Ayala Skycourt',
        location: 'Cebu Business Park',
        address: 'Cebu Business Park, Cebu City, Philippines',
        distance: '1.5 km',
        travelTime: '5 min',
        rating: '4.9',
        reviews: 288,
        courtCount: 4,
        price: '₱550',
        peakPrice: '₱650',
        type: 'Outdoor',
        image: '/images/sports-2.webp',
        coordinates: [10.3187, 123.9056],
        availableSlots: 6,
        openHours: '6 AM – 10 PM daily',
        description: 'Play above the city on four open-air courts with skyline views, convenient parking, and a relaxed cafe nearby.',
        amenities: [
            { name: 'Night lights', icon: Lightbulb },
            { name: 'Parking', icon: ParkingSquare },
            { name: 'Cafe', icon: Coffee },
        ],
    },
    {
        name: 'Guadalupe Community Courts',
        location: 'Guadalupe',
        address: 'Guadalupe, Cebu City, Philippines',
        distance: '1.7 km',
        travelTime: '5 min',
        rating: '4.2',
        reviews: 64,
        courtCount: 2,
        price: '₱200',
        peakPrice: '₱280',
        type: 'Outdoor',
        image: '/images/sports-3.webp',
        coordinates: [10.3024, 123.8858],
        availableSlots: 2,
        openHours: '7 AM – 10 PM daily',
        description: 'A friendly neighborhood spot with two outdoor courts, easy-going games, and affordable hourly play.',
        amenities: [
            { name: 'Night lights', icon: Lightbulb },
            { name: 'Showers', icon: Droplets },
        ],
    },
    {
        name: 'Banawa Hillside Courts',
        location: 'Banawa',
        address: 'Banawa, Cebu City, Philippines',
        distance: '1.8 km',
        travelTime: '5 min',
        rating: '4.3',
        reviews: 58,
        courtCount: 2,
        price: '₱280',
        peakPrice: '₱350',
        type: 'Outdoor',
        image: '/images/sports-4.webp',
        coordinates: [10.3066, 123.8832],
        availableSlots: 4,
        openHours: '6 AM – 11 PM daily',
        description: 'Two breezy hillside courts with evening lights and a quiet setting for casual games or focused practice.',
        amenities: [
            { name: 'Night lights', icon: Lightbulb },
            { name: 'Parking', icon: ParkingSquare },
        ],
    },
];

export default function SidebarCourtSection({
    darkMode = false,
    savedCourts = [],
    onToggleSaved = () => {},
    onSelectCourt = () => {},
}) {
    return (
        <section aria-label="Courts near you" className="min-w-0">
            <p className={`mb-2 text-xs ${darkMode ? 'text-[#91aa9a]' : 'text-slate-600'}`}>
                14 venues · sorted by distance
            </p>

            <div className="space-y-3">
                {COURTS.map((court) => {
                    const isSaved = savedCourts.includes(court.name);

                    return (
                        <article
                            key={court.name}
                            className={[
                                'group relative rounded-2xl border p-2.5 transition-[border-color,box-shadow,transform] hover:-translate-y-0.5',
                                darkMode
                                    ? 'border-[#19382b] bg-[#0b2117] shadow-[0_8px_20px_rgba(0,0,0,0.14)] hover:border-[#55752a]'
                                    : 'border-[#dce2d4] bg-white shadow-[0_1px_2px_rgba(24,39,28,0.03)] hover:border-[#b8cabb]',
                            ].join(' ')}
                        >
                            <button
                                type="button"
                                onClick={() => onSelectCourt(court)}
                                aria-label={`View details for ${court.name}`}
                                className="w-full rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]"
                            >
                                <div className="flex gap-3">
                                    <div className="relative h-36 w-28 shrink-0 overflow-hidden rounded-xl sm:w-32">
                                        <img
                                            src={court.image}
                                            alt={`${court.name} court`}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <Badge variant="brand" className="absolute left-1.5 top-1.5">
                                            {court.type}
                                        </Badge>
                                    </div>

                                    <div className="flex min-w-0 flex-1 flex-col pr-7">
                                        <div className="min-w-0">
                                            <h2 className={`line-clamp-2 text-sm font-bold leading-tight ${darkMode ? 'text-[#edf4ef]' : 'text-slate-900'}`}>
                                                {court.name}
                                            </h2>
                                            <p className={`mt-1 flex items-center gap-1 text-xs ${darkMode ? 'text-[#91aa9a]' : 'text-slate-600'}`}>
                                                <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                                                <span className="truncate">
                                                    {court.distance} · {court.travelTime} · {court.location}
                                                </span>
                                            </p>
                                            <p className={`mt-1.5 flex items-center gap-1.5 text-xs ${darkMode ? 'text-[#91aa9a]' : 'text-slate-600'}`}>
                                                <Star className="h-3.5 w-3.5 fill-[#a86308] text-[#a86308]" aria-hidden="true" />
                                                <span className={`font-semibold ${darkMode ? 'text-[#edf4ef]' : 'text-slate-900'}`}>{court.rating}</span>
                                                <span>({court.reviews})</span>
                                                <span className="ml-1">{court.courtCount} courts</span>
                                            </p>
                                        </div>

                                        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                                            <div className="min-w-0">
                                                <Badge variant={darkMode ? 'brand' : 'success'} className={`inline-flex items-center gap-1 ${darkMode ? '' : '!bg-[#edf1e8] !text-slate-600'}`}>
                                                    <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                                                    {court.availableSlots > 0
                                                        ? `${court.availableSlots} slots open`
                                                        : 'Fully booked'}
                                                </Badge>
                                                <div className={`mt-1.5 flex items-center gap-2 ${darkMode ? 'text-[#8eaa99]' : 'text-[#59675f]'}`}>
                                                    {court.amenities.slice(0, 3).map(({ icon: Amenity }, index) => (
                                                        <Amenity
                                                            key={`${court.name}-amenity-${index}`}
                                                            className="h-3.5 w-3.5"
                                                            aria-hidden="true"
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <p className={`shrink-0 text-right text-lg font-extrabold leading-none ${darkMode ? 'text-[#f0f5f1]' : 'text-slate-950'}`}>
                                                {court.price}
                                                <span className={`text-xs font-normal ${darkMode ? 'text-[#91aa9a]' : 'text-slate-600'}`}>/hr</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => onToggleSaved(court.name)}
                                aria-label={`${isSaved ? 'Remove' : 'Save'} ${court.name}`}
                                aria-pressed={isSaved}
                                className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c6958] ${darkMode ? 'text-[#91aa9a] hover:bg-[#163326] hover:text-[#d6f52f]' : 'text-[#58675f] hover:bg-[#f1f5ef] hover:text-[#173f35]'}`}
                            >
                                <Heart
                                    className={`h-4 w-4 ${isSaved ? (darkMode ? 'fill-[#d6f52f] text-[#d6f52f]' : 'fill-[#1c6958] text-[#1c6958]') : ''}`}
                                    aria-hidden="true"
                                />
                            </button>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
