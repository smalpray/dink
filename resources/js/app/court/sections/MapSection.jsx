import { useMemo } from 'react';
import { divIcon } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { COURTS } from './SidebarCourtSection';
import 'leaflet/dist/leaflet.css';

const COURT_MARKERS = [
    ...COURTS.map((court) => ({
        name: court.name,
        position: court.coordinates,
        price: court.price,
        status: court.availableSlots > 4 ? 'open' : court.availableSlots > 0 ? 'few' : 'full',
    })),
    { name: 'Lahug Pickle Park', position: [10.3291, 123.8987], price: '₱420', status: 'few' },
    { name: 'Cebu Business Park Courts', position: [10.3212, 123.9079], price: '₱480', status: 'open' },
    { name: 'Fuente Sports Center', position: [10.3104, 123.8936], price: '₱350', status: 'full' },
    { name: 'Cebu City Racquet Club', position: [10.3262, 123.8871], price: '₱300', status: 'open' },
    { name: 'Mabolo Community Court', position: [10.3237, 123.9000], price: '₱250', status: 'full' },
];

const STATUS_STYLES = {
    open: 'court-price-marker__label--open',
    few: 'court-price-marker__label--few',
    full: 'court-price-marker__label--full',
};

function createPriceIcon(price, status) {
    return divIcon({
        className: 'court-price-marker',
        html: `<span class="court-price-marker__label ${STATUS_STYLES[status]}">${status === 'open' ? '✓ ' : ''}${price}</span>`,
        iconSize: [68, 32],
        iconAnchor: [34, 16],
    });
}

export default function MapSection({ darkMode = false }) {
    const markers = useMemo(
        () =>
            COURT_MARKERS.map((court) => ({
                ...court,
                icon: createPriceIcon(court.price, court.status),
            })),
        [],
    );

    return (
        <section
            aria-label="Map of nearby courts"
            className={[
                'relative h-full min-h-[55vh] overflow-hidden transition-colors lg:min-h-0',
                darkMode && 'map-dark',
                darkMode ? 'bg-[#222522]' : 'bg-[#e8e8e3]',
            ].filter(Boolean).join(' ')}
        >
            <div className={[
                'pointer-events-none absolute left-3 top-3 z-[500] flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-semibold shadow-md backdrop-blur',
                darkMode
                    ? 'border-[#314139] bg-[#10251b]/95 text-[#c5d6ca]'
                    : 'border-white/70 bg-white/90 text-slate-600',
            ].join(' ')}>
                <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#16834b]" />
                    Open
                </span>
                <span className="text-slate-300">·</span>
                <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#b95708]" />
                    Few left
                </span>
                <span className="text-slate-300">·</span>
                <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#718078]" />
                    Full
                </span>
            </div>

            <MapContainer
                center={[10.3157, 123.891]}
                zoom={13}
                scrollWheelZoom
                className="h-full w-full"
                aria-label="Interactive map showing nearby pickleball courts in Cebu City"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((court) => (
                    <Marker key={court.name} position={court.position} icon={court.icon}>
                        <Popup>
                            <div className="min-w-36">
                                <p className="font-semibold">{court.name}</p>
                                <p className="mt-1 text-sm">{court.price} / hour</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </section>
    );
}
