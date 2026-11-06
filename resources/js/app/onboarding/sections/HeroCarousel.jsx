export default function HeroCarousel({ active = 0, total = 4 }) {
    return (
        <div className="flex items-center gap-2 pb-4">
            {Array.from({ length: total }).map((_, index) => (
                <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                        index === active ? 'w-8 bg-[#d5ee5d]' : 'w-2 bg-white/55'
                    }`}
                />
            ))}
        </div>
    );
}
