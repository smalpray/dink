import { Banknote, CreditCard, Smartphone, Store } from 'lucide-react';

const METHODS = [
    { id: 'GCash', title: 'GCash', description: 'Pay with your GCash wallet', icon: Smartphone },
    { id: 'Maya', title: 'Maya', description: 'Pay with your Maya wallet', icon: CreditCard },
    { id: 'Card', title: 'Credit / debit card', description: 'Visa, Mastercard, JCB', icon: CreditCard },
    { id: 'Venue', title: 'Pay at venue', description: 'Cash or card at the front desk', icon: Store },
];

export default function PaymentSection({ darkMode, method, onMethodChange }) {
    const heading = darkMode ? 'text-[#edf4ef]' : 'text-slate-900';
    const muted = darkMode ? 'text-[#8eaa99]' : 'text-slate-500';

    return (
        <section aria-labelledby="payment-heading" className="flex flex-col gap-3">
            <h2 id="payment-heading" className={`text-lg font-bold ${heading}`}>
                Pay &amp; confirm
            </h2>
            <fieldset>
                <legend className="sr-only">Choose a payment method</legend>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {METHODS.map(({ id, title, description, icon: Icon }) => {
                        const selected = method === id;

                        return (
                            <label
                                key={id}
                                className={[
                                    'flex min-h-[58px] cursor-pointer items-center gap-2.5 rounded-2xl border px-3 py-2 transition-[border-color,background-color] focus-within:ring-2 focus-within:ring-[#d6f52f]',
                                    selected
                                        ? 'border-[#d6f52f] bg-[#d6f52f]/5'
                                        : darkMode
                                          ? 'border-[#19382b] bg-[#0b2117] hover:bg-[#102a1e]'
                                          : 'border-[#dfe5da] bg-white hover:bg-[#f0f5ef]',
                                ].join(' ')}
                            >
                                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${selected ? 'bg-[#d6f52f] text-[#0b2117]' : darkMode ? 'bg-[#102a1e] text-[#8eaa99]' : 'bg-[#f0f5ef] text-slate-500'}`}>
                                    <Icon className="h-4 w-4" aria-hidden="true" />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className={`block truncate text-xs font-semibold ${heading}`}>{title}</span>
                                    <span className={`block truncate text-[10px] ${muted}`}>{description}</span>
                                </span>
                                <input
                                    type="radio"
                                    name="payment-method"
                                    value={id}
                                    checked={selected}
                                    onChange={() => onMethodChange(id)}
                                    className="h-4 w-4 accent-[#d6f52f] focus:ring-[#d6f52f]"
                                />
                            </label>
                        );
                    })}
                </div>
            </fieldset>

            <p className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-[10px] ${darkMode ? 'bg-[#102a1e] text-[#8eaa99]' : 'bg-[#edf1e8] text-slate-600'}`}>
                <Banknote className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Payment is simulated in this prototype. No payment will be charged.
            </p>
            <p className={`text-[10px] ${muted}`}>
                Free cancellation up to 24 hours before your slot.
            </p>
        </section>
    );
}
