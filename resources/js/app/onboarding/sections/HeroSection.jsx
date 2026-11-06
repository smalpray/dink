import { useEffect, useState } from 'react';
import HeroCarousel from './HeroCarousel';

const slides = [
    '/images/sports-1.webp',
    '/images/sports-2.webp',
    '/images/sports-4.webp',
    '/images/sports-5.webp',
];

export default function HeroSection() {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((current) => (current + 1) % slides.length);
        }, 2800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative hidden w-[56%] min-w-[540px] overflow-hidden bg-slate-900 md:block">
            {slides.map((slide, index) => (
                <div
                    key={slide + index}
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
                        index === activeSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ backgroundImage: `url(${slide})` }}
                />
            ))}

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.3),rgba(0,0,0,0.18),rgba(9,25,28,0.2))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(34,197,94,0.14),transparent_28%),linear-gradient(120deg,rgba(11,80,82,0.57),rgba(0,0,0,0.18))]" />

            <div className="relative flex h-full flex-col justify-between px-7 pb-8 pt-6">
                <div className="flex items-center gap-3 text-white">
                    <div className="h-4 w-4 rounded-full bg-[#d5ee5d] shadow-[0_0_18px_rgba(213,238,93,0.8)]" />
                    <span className="text-[1.05rem] font-semibold tracking-tight">DinkZone</span>
                </div>

                <div className="pb-4">
                    <div className="text-[0.78rem] font-medium uppercase tracking-[0.28em] text-[#d5ee5d]">
                        Cebu City • 14 Venues • 58 Courts
                    </div>
                    <h1 className="mt-4 max-w-[520px] text-[4.25rem] font-black leading-[0.86] tracking-[-0.06em] text-white">
                        Find a court.
                        <span className="block text-[#d5ee5d]">Book in 30</span>
                        seconds.
                    </h1>
                </div>

                <HeroCarousel active={activeSlide} total={slides.length} />
            </div>
        </div>
    );
}
