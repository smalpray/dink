import Button from '@/app/components/Button';

export default function LocationPermissionSection({ onAllow, onManual }) {
    return (
        <div className="flex h-full w-full items-center justify-center bg-[#f4f2ef] px-8 py-10 lg:px-12">
            <div className="w-full max-w-[420px]">
                <div className="mb-8 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0d4d45] text-white shadow-[0_10px_20px_rgba(13,77,69,0.2)]">
                        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
                            <path d="M4.9 9.9A7.1 7.1 0 0 1 18.1 9.9c0 5.1-7.1 11.3-7.1 11.3S4.9 15 4.9 9.9Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="9.8" r="2.5" stroke="currentColor" strokeWidth="1.8" />
                        </svg>
                    </div>
                </div>

                <h2 className="text-center text-[1.7rem] font-semibold tracking-[-0.04em] text-[#0f172a]">
                    See courts closest to you
                </h2>
                <p className="mx-auto mt-3 max-w-[330px] text-center text-[0.98rem] leading-6 text-slate-500">
                    We use your location only to sort courts by distance and travel time. It&apos;s never shared with venues, and you can turn it off anytime.
                </p>

                <div className="mt-8 space-y-3">
                    <Button
                        type="button"
                        variant="dinkzone"
                        size="lg"
                        onClick={onAllow}
                        className="w-full rounded-xl px-4 py-4 text-base font-semibold"
                    >
                        Allow location
                    </Button>

                    <Button
                        type="button"
                        variant="dinkzone"
                        outlined
                        onClick={onManual}
                        className="w-full rounded-xl !border-[#d3d5d1] !bg-[#f1efe9] px-4 py-4 text-base font-medium !text-slate-700 hover:!bg-[#eae7e1]"
                    >
                        Enter a location instead
                    </Button>
                </div>

                <label className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
                    <input type="checkbox" readOnly checked className="h-4 w-4 accent-[#0d4a45]" />
                    Your browser will ask next — “Allow while using this site”.
                </label>
            </div>
        </div>
    );
}
