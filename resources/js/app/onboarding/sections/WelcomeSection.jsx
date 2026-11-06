import Button from '@/app/components/Button';

function IconCheck({ className = '' }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
            <path d="M12 21.75a9.75 9.75 0 1 0 0-19.5 9.75 9.75 0 0 0 0 19.5Z" stroke="currentColor" strokeWidth="1.7" />
            <path d="M8.25 12.5 10.7 15l5.05-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function FeatureItem({ icon, title, description }) {
    return (
        <div className="flex items-start gap-4 py-3">
            <div className="mt-0.5 flex h-7 w-7 items-center justify-center text-[#0d4d45]">
                {icon}
            </div>
            <div>
                <div className="text-[1.05rem] font-semibold text-[#0f172a]">{title}</div>
                <div className="mt-1 text-sm leading-5 text-slate-500">{description}</div>
            </div>
        </div>
    );
}

export default function WelcomeSection({ onGetStarted, onSkip }) {
    return (
        <div className="flex h-full w-full items-center justify-center bg-[#f4f2ef] px-8 py-10 lg:px-12">
            <div className="w-full max-w-[470px]">
                <div className="space-y-5">
                    <FeatureItem
                        icon={<IconCheck className="h-5 w-5" />}
                        title="Nearest courts first"
                        description="Live availability across every venue in the city."
                    />
                    <FeatureItem
                        icon={<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true"><path d="M7 14.5V8.8A2.8 2.8 0 0 1 9.8 6h4.4A2.8 2.8 0 0 1 17 8.8v5.7l-2.3 2.2-.9-.9.1-.1v-4.7H10v4.8l-.8.8L7 14.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 9.8h6M9 12.2h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>}
                        title="Tap or scan to enter"
                        description="Your booking is a QR pass — or link an NFC card."
                    />
                    <FeatureItem
                        icon={<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true"><path d="M12 20.5c4.4-2.3 7-5.6 7-9.4A4.6 4.6 0 0 0 14.4 6 4.8 4.8 0 0 0 12 7.5 4.8 4.8 0 0 0 9.6 6 4.6 4.6 0 0 0 5 11.1c0 3.8 2.6 7.1 7 9.4Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 9.6v4.6M12 17.4h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>}
                        title="Play for real prizes"
                        description="Join tournaments with prize pools up to ₱300,000."
                    />
                </div>

                <Button
                    type="button"
                    variant="dinkzone"
                    size="lg"
                    onClick={onGetStarted}
                    className="mt-9 w-full rounded-xl px-4 py-4 text-base font-semibold shadow-[0_12px_24px_rgba(13,74,69,0.18)]"
                >
                    Get started
                </Button>

                <button
                    type="button"
                    onClick={onSkip}
                    className="mt-5 block w-full text-center text-base text-slate-600 underline-offset-4 hover:underline"
                >
                    Skip for now
                </button>
            </div>
        </div>
    );
}
