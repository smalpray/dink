import { useEffect, useMemo, useState } from 'react';
import {
    ArrowLeft,
    Check,
    CheckCircle2,
    Circle,
    Flame,
    LockKeyhole,
    MapPin,
    Timer,
} from 'lucide-react';
import PlayersSection from './PlayersSection';
import PaymentSection from './PaymentSection';
import BookingConfirmationSection from './BookingConfirmationSection';

const START_HOUR = 6;
const END_HOUR = 22;
const MAX_CONSECUTIVE_SLOTS = 3;
const SERVICE_FEE = 25;
const ADD_ON_PRICES = {
    paddle: 150,
    balls: 180,
    water: 40,
};

function getLocalDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function formatHour(hour) {
    const normalizedHour = hour % 24;
    const period = normalizedHour >= 12 ? 'PM' : 'AM';
    const displayHour = normalizedHour % 12 || 12;

    return `${displayHour} ${period}`;
}

function formatSelectedDate(date) {
    return new Intl.DateTimeFormat('en', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    }).format(date);
}

function getSlotStatus(hour, courtIndex, dayOffset) {
    const isBooked = (hour + courtIndex * 3 + dayOffset) % 9 === 0;

    if (isBooked) {
        return 'booked';
    }

    return hour >= 17 && hour < 21 ? 'peak' : 'available';
}

export default function BookASlotSection({
    court,
    darkMode = false,
    onBack = () => {},
    onDone = () => {},
}) {
    const dates = useMemo(() => {
        const today = new Date();

        return Array.from({ length: 10 }, (_, index) => {
            const date = new Date(today);
            date.setDate(today.getDate() + index);

            return {
                date,
                key: getLocalDateKey(date),
                weekday: new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date),
                day: date.getDate(),
                isToday: index === 0,
            };
        });
    }, []);
    const [selectedDateKey, setSelectedDateKey] = useState(dates[0].key);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [step, setStep] = useState(2);
    const [playerCount, setPlayerCount] = useState(4);
    const [addOns, setAddOns] = useState({ paddle: 0, balls: 0, water: 0 });
    const [paymentMethod, setPaymentMethod] = useState('GCash');
    const [holdSeconds, setHoldSeconds] = useState(300);
    const [notice, setNotice] = useState('');
    const selectedDate = dates.find((date) => date.key === selectedDateKey) ?? dates[0];
    const dayOffset = dates.findIndex((date) => date.key === selectedDateKey);
    const courtNumbers = Array.from({ length: court.courtCount }, (_, index) => index + 1);
    const hours = Array.from(
        { length: END_HOUR - START_HOUR },
        (_, index) => START_HOUR + index,
    );
    const selectedCourtNumber = selectedSlots[0]?.courtNumber;
    const selectedHours = selectedSlots.map((slot) => slot.hour).sort((a, b) => a - b);
    const firstSelectedHour = selectedHours[0];
    const lastSelectedHour = selectedHours[selectedHours.length - 1];
    const totalPrice = selectedSlots.reduce((total, slot) => {
        const price = slot.hour >= 17 && slot.hour < 21
            ? Number(court.peakPrice.replace(/[^\d]/g, ''))
            : Number(court.price.replace(/[^\d]/g, ''));

        return total + price;
    }, 0);
    const addOnTotal = Object.entries(addOns).reduce(
        (total, [name, quantity]) => total + ADD_ON_PRICES[name] * quantity,
        0,
    );
    const serviceFee = selectedSlots.length > 0 ? SERVICE_FEE : 0;
    const orderTotal = totalPrice + serviceFee + addOnTotal;
    const holdTimeLabel = `${Math.floor(holdSeconds / 60)}:${String(holdSeconds % 60).padStart(2, '0')}`;
    const palette = darkMode
        ? {
              background: 'bg-[#07140f] text-[#e8f0eb]',
              panel: 'border-[#19382b] bg-[#0b2117]',
              raised: 'bg-[#102a1e]',
              muted: 'text-[#8eaa99]',
              heading: 'text-[#edf4ef]',
              divider: 'border-[#19382b]',
              idleDate: 'border-[#19382b] bg-[#0b2117] text-[#b8cdbf] hover:border-[#55752a]',
          }
        : {
              background: 'bg-[#f5f7f3] text-slate-900',
              panel: 'border-[#dfe5da] bg-white',
              raised: 'bg-[#f0f5ef]',
              muted: 'text-slate-500',
              heading: 'text-slate-900',
              divider: 'border-[#e2e8df]',
              idleDate: 'border-[#dfe5da] bg-white text-slate-700 hover:border-[#9eb49c]',
          };

    const selectDate = (dateKey) => {
        setSelectedDateKey(dateKey);
        setSelectedSlots([]);
        setNotice('');
    };

    useEffect(() => {
        if (step === 2 || step === 5 || holdSeconds <= 0) {
            return undefined;
        }

        const timer = window.setInterval(() => {
            setHoldSeconds((current) => Math.max(0, current - 1));
        }, 1000);

        return () => window.clearInterval(timer);
    }, [step, holdSeconds]);

    const toggleSlot = (hour, courtNumber) => {
        setNotice('');
        setSelectedSlots((current) => {
            const isSelected = current.some(
                (slot) => slot.hour === hour && slot.courtNumber === courtNumber,
            );

            if (isSelected) {
                return current.filter(
                    (slot) => slot.courtNumber !== courtNumber || slot.hour < hour,
                );
            }

            if (current.length > 0) {
                const sameCourt = current.every((slot) => slot.courtNumber === courtNumber);
                const isAdjacent = current.some((slot) => Math.abs(slot.hour - hour) === 1);

                if (!sameCourt || !isAdjacent || current.length >= MAX_CONSECUTIVE_SLOTS) {
                    return current;
                }
            }

            return [...current, { hour, courtNumber }];
        });
    };

    const handleSelectTime = () => {
        if (selectedSlots.length === 0) {
            return;
        }

        setNotice('');
        setStep(3);
    };

    const updateAddOn = (name, quantity) => {
        setAddOns((current) => ({ ...current, [name]: quantity }));
    };

    const handlePayment = () => {
        if (holdSeconds <= 0) {
            setNotice('Your slot hold expired. Please return to the time step and choose a slot again.');
            return;
        }

        setNotice('');
        setStep(5);
    };

    const continueToPayment = () => {
        if (holdSeconds <= 0) {
            setStep(2);
            setSelectedSlots([]);
            setNotice('Your slot hold expired. Please choose a new time.');
            return;
        }

        setNotice('');
        setStep(4);
    };

    if (step === 5) {
        return (
            <BookingConfirmationSection
                court={court}
                date={selectedDate.date}
                selectedSlots={selectedSlots}
                playerCount={playerCount}
                addOns={addOns}
                paymentMethod={paymentMethod}
                total={orderTotal}
                darkMode={darkMode}
                onDone={onDone}
            />
        );
    }

    return (
        <div className={`min-h-screen flex-1 overflow-y-auto transition-colors lg:h-full lg:min-h-0 ${palette.background}`}>
            <main className="mx-auto w-full max-w-6xl px-4 pb-8 pt-16 sm:px-6 sm:pt-6 lg:px-8 lg:pt-3">
                <header className={`border-b pb-3 ${palette.divider}`}>
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-start gap-3">
                        <button
                            type="button"
                            onClick={() => step === 2 ? onBack() : setStep((current) => Math.max(2, current - 1))}
                            aria-label={step === 2 ? 'Return to court details' : 'Return to previous booking step'}
                            className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f] ${palette.muted}`}
                        >
                            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <div className="min-w-0">
                            <h1 className={`truncate text-sm font-bold ${palette.heading}`}>
                                {court.name}
                            </h1>
                            <p className={`text-xs ${palette.muted}`}>Step {step} of 4</p>
                        </div>
                        </div>
                        {step > 2 && (
                            <span className="inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-full bg-[#26380c] px-2.5 text-[10px] font-semibold text-[#d6f52f]">
                                <Timer className="h-3 w-3" aria-hidden="true" />
                                Held {holdTimeLabel}
                            </span>
                        )}
                    </div>

                    <ol aria-label="Booking progress" className="mt-3 grid grid-cols-4 gap-2">
                        {['Court', 'Time', 'Players', 'Pay'].map((stepName, index) => {
                            const stepNumber = index + 1;
                            const isComplete = stepNumber < step;
                            const isCurrent = stepNumber === step;

                            return (
                                <li key={stepName} className="flex min-w-0 items-center gap-1.5">
                                    <span
                                        className={[
                                            'flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold',
                                            isComplete || isCurrent
                                                ? 'bg-[#d6f52f] text-[#0b2117]'
                                                : darkMode
                                                  ? 'bg-[#19382b] text-[#8eaa99]'
                                                  : 'bg-[#e2e8df] text-slate-500',
                                        ].join(' ')}
                                    >
                                        {isComplete ? (
                                            <Check className="h-3 w-3" aria-hidden="true" />
                                        ) : (
                                            stepNumber
                                        )}
                                    </span>
                                    {isComplete || isCurrent ? (
                                        <button
                                            type="button"
                                            onClick={() => stepNumber === 1 ? onBack() : setStep(stepNumber)}
                                            aria-current={isCurrent ? 'step' : undefined}
                                            className={`truncate text-[10px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f] ${isCurrent ? palette.heading : palette.muted}`}
                                        >
                                            {stepName}
                                        </button>
                                    ) : (
                                        <span className={`truncate text-[10px] font-medium ${palette.muted}`}>
                                            {stepName}
                                        </span>
                                    )}
                                    {index < 3 && (
                                        <span className={`h-px min-w-1 flex-1 ${isComplete ? 'bg-[#d6f52f]/70' : darkMode ? 'bg-[#19382b]' : 'bg-[#e2e8df]'}`} />
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </header>

                <div className="mt-4 grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_276px]">
                    <div className="min-w-0">
                        <div className={`flex items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 ${palette.panel}`}>
                            <div className="flex min-w-0 items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
                                <p className={`truncate text-xs ${palette.muted}`}>
                                    Court · <strong className={palette.heading}>{court.name}</strong>
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={onBack}
                                className="min-h-11 shrink-0 rounded-lg px-2 text-xs font-bold text-[#d6f52f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]"
                            >
                                Change
                            </button>
                        </div>

                        {step === 2 ? (
                        <>
                        <section aria-labelledby="date-time-heading" className="mt-4">
                            <h2 id="date-time-heading" className={`text-lg font-bold ${palette.heading}`}>
                                Pick a date &amp; time
                            </h2>
                            <div className="-mx-1 mt-2 flex gap-1.5 overflow-x-auto px-1 pb-1">
                                {dates.map((date) => {
                                    const isSelected = date.key === selectedDateKey;

                                    return (
                                        <button
                                            key={date.key}
                                            type="button"
                                            onClick={() => selectDate(date.key)}
                                            aria-pressed={isSelected}
                                            aria-label={`${date.isToday ? 'Today, ' : ''}${formatSelectedDate(date.date)}`}
                                            className={[
                                                'flex min-h-[54px] min-w-[49px] shrink-0 flex-col items-center justify-center rounded-xl border px-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]',
                                                isSelected
                                                    ? 'border-[#d6f52f] bg-[#d6f52f] text-[#0b2117]'
                                                    : palette.idleDate,
                                            ].join(' ')}
                                        >
                                            <span className="text-[9px] font-semibold uppercase">
                                                {date.isToday ? 'Today' : date.weekday}
                                            </span>
                                            <span className="text-sm font-bold leading-4">{date.day}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                            <p className={`text-[11px] font-semibold ${palette.heading}`}>
                                1-hour blocks · select up to 3 in a row
                            </p>
                            <div aria-label="Time slot legend" className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] ${palette.muted}`}>
                                <span className="inline-flex items-center gap-1">
                                    <span className="h-2.5 w-2.5 rounded-sm border border-emerald-500/60 bg-emerald-500/10" />
                                    Available
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <Flame className="h-3 w-3 text-amber-400" aria-hidden="true" />
                                    Peak
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <LockKeyhole className="h-2.5 w-2.5" aria-hidden="true" />
                                    Booked
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <span className="h-2.5 w-2.5 rounded-sm bg-[#d6f52f]" />
                                    Selected
                                </span>
                            </div>
                        </div>

                        <div className={`mt-2 overflow-hidden rounded-2xl border ${palette.panel}`}>
                            <div className="max-h-[390px] overflow-auto">
                                <div
                                    role="grid"
                                    aria-label={`Court availability for ${formatSelectedDate(selectedDate.date)}`}
                                    className="min-w-max"
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: `66px repeat(${courtNumbers.length}, minmax(68px, 1fr))`,
                                    }}
                                >
                                    <div
                                        role="columnheader"
                                        className={`sticky top-0 z-10 flex h-10 items-center px-2 text-[10px] font-semibold ${palette.muted} ${palette.raised}`}
                                    >
                                        Time
                                    </div>
                                    {courtNumbers.map((courtNumber) => (
                                        <div
                                            key={`header-${courtNumber}`}
                                            role="columnheader"
                                            className={`sticky top-0 z-10 flex h-10 items-center justify-center px-1 text-[10px] font-semibold ${palette.muted} ${palette.raised}`}
                                        >
                                            Court {courtNumber}
                                        </div>
                                    ))}

                                    {hours.map((hour) => (
                                        <div key={hour} role="row" className="contents">
                                            <div
                                                role="rowheader"
                                                className={`flex h-12 items-center px-2 text-[10px] font-medium ${palette.muted}`}
                                            >
                                                {formatHour(hour)}
                                            </div>
                                            {courtNumbers.map((courtNumber) => {
                                                const status = getSlotStatus(hour, courtNumber, dayOffset);
                                                const isSelected = selectedSlots.some(
                                                    (slot) => slot.hour === hour && slot.courtNumber === courtNumber,
                                                );
                                                const isBooked = status === 'booked';
                                                const isPeak = status === 'peak';
                                                const label = isBooked
                                                    ? 'Booked'
                                                    : isPeak
                                                      ? 'Available, peak rate'
                                                      : 'Available';

                                                return (
                                                    <div
                                                        key={`${hour}-${courtNumber}`}
                                                        role="gridcell"
                                                        className="flex h-12 items-center justify-center px-1"
                                                    >
                                                        <button
                                                            type="button"
                                                            disabled={isBooked}
                                                            aria-label={`${label}, ${formatHour(hour)} to ${formatHour(hour + 1)}, Court ${courtNumber}`}
                                                            aria-pressed={isSelected}
                                                            onClick={() => toggleSlot(hour, courtNumber)}
                                                            className={[
                                                                'flex h-11 w-full min-w-[48px] items-center justify-center rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f] disabled:cursor-not-allowed',
                                                                isSelected
                                                                    ? 'border-[#d6f52f] bg-[#d6f52f] text-[#0b2117]'
                                                                    : isBooked
                                                                      ? darkMode
                                                                          ? 'border-[#19382b] bg-[#091b13] text-[#50675a]'
                                                                          : 'border-[#e5e9e2] bg-[#f3f5f1] text-slate-400'
                                                                      : isPeak
                                                                        ? 'border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
                                                                        : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20',
                                                            ].join(' ')}
                                                        >
                                                            {isSelected ? (
                                                                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                                            ) : isBooked ? (
                                                                <LockKeyhole className="h-3 w-3" aria-hidden="true" />
                                                            ) : isPeak ? (
                                                                <Flame className="h-3 w-3" aria-hidden="true" />
                                                            ) : (
                                                                <Circle className="h-2 w-2 fill-current" aria-hidden="true" />
                                                            )}
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {notice && (
                            <p role="status" className="mt-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-500">
                                {notice}
                            </p>
                        )}
                        </>
                        ) : step === 3 ? (
                            <PlayersSection
                                darkMode={darkMode}
                                playerCount={playerCount}
                                onPlayerCountChange={setPlayerCount}
                                addOns={addOns}
                                onAddOnChange={updateAddOn}
                            />
                        ) : (
                            <PaymentSection
                                darkMode={darkMode}
                                method={paymentMethod}
                                onMethodChange={setPaymentMethod}
                            />
                        )}
                    </div>

                    <aside className={`rounded-2xl border p-4 lg:sticky lg:top-4 ${palette.panel}`}>
                        <div className="flex items-center gap-2.5">
                            <img
                                src={court.image}
                                alt=""
                                className="h-12 w-12 shrink-0 rounded-xl object-cover"
                            />
                            <div className="min-w-0">
                                <h2 className={`truncate text-xs font-bold ${palette.heading}`}>{court.name}</h2>
                                <p className={`mt-0.5 flex items-center gap-1 text-[10px] ${palette.muted}`}>
                                    <MapPin className="h-3 w-3" aria-hidden="true" />
                                    {court.location}
                                </p>
                            </div>
                        </div>

                        <dl className={`mt-4 flex flex-col gap-2 border-b pb-3 text-[11px] ${palette.divider}`}>
                            <div className="flex items-center justify-between gap-3">
                                <dt className={palette.muted}>Date</dt>
                                <dd className={`text-right font-semibold ${palette.heading}`}>
                                    {formatSelectedDate(selectedDate.date)}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <dt className={palette.muted}>Time</dt>
                                <dd className={`text-right font-semibold ${palette.heading}`}>
                                    {selectedSlots.length > 0
                                        ? `${formatHour(firstSelectedHour)} – ${formatHour(lastSelectedHour + 1)}`
                                        : '—'}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <dt className={palette.muted}>Court</dt>
                                <dd className={`text-right font-semibold ${palette.heading}`}>
                                    {selectedCourtNumber ? `Court ${selectedCourtNumber}` : '—'}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <dt className={palette.muted}>Players</dt>
                                <dd className={`text-right font-semibold ${palette.heading}`}>4</dd>
                            </div>
                        </dl>

                        <div className={`flex flex-col gap-2 border-b py-3 text-[11px] ${palette.divider}`}>
                            <div className="flex items-center justify-between gap-3">
                                <span className={palette.muted}>
                                    Court · {selectedSlots.length} {selectedSlots.length === 1 ? 'hr' : 'hrs'}
                                </span>
                                <span className={`font-semibold ${palette.heading}`}>
                                    ₱{totalPrice.toLocaleString()}
                                </span>
                            </div>
                            {Object.entries(addOns).filter(([, quantity]) => quantity > 0).map(([name, quantity]) => (
                                <div key={name} className="flex items-center justify-between gap-3">
                                    <span className={palette.muted}>
                                        {name === 'balls' ? 'Ball pack' : name === 'water' ? 'Cold water' : 'Paddle rental'} × {quantity}
                                    </span>
                                    <span className={`font-semibold ${palette.heading}`}>
                                        ₱{(ADD_ON_PRICES[name] * quantity).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                            <div className="flex items-center justify-between gap-3">
                                <span className={palette.muted}>Service fee</span>
                                <span className={palette.heading}>₱{serviceFee.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 py-3">
                            <span className={`text-sm font-bold ${palette.heading}`}>Total</span>
                            <span className={`text-lg font-black ${palette.heading}`}>₱{orderTotal.toLocaleString()}</span>
                        </div>

                        <button
                            type="button"
                            onClick={step === 2 ? handleSelectTime : step === 3 ? continueToPayment : handlePayment}
                            disabled={step === 2 && selectedSlots.length === 0 || step > 2 && holdSeconds <= 0}
                            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#d6f52f] px-4 text-xs font-bold text-[#0b2117] transition-[box-shadow,transform,opacity] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(214,245,47,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2117] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                        >
                            {step === 2
                                ? selectedSlots.length > 0 ? 'Continue to players' : 'Pick a time slot'
                                : step === 3
                                  ? holdSeconds > 0 ? 'Continue to payment' : 'Time hold expired'
                                  : holdSeconds > 0 ? `Confirm demo · ₱${orderTotal.toLocaleString()}`
                                    : 'Time hold expired'}
                        </button>
                        {step > 2 && holdSeconds <= 0 && (
                            <button
                                type="button"
                                onClick={() => {
                                    setStep(2);
                                    setSelectedSlots([]);
                                    setHoldSeconds(300);
                                    setNotice('Choose a new time to restart your reservation hold.');
                                }}
                                className={`mt-2 min-h-10 w-full rounded-xl border text-xs font-semibold ${darkMode ? 'border-[#19382b] text-[#d7e4dc]' : 'border-[#dfe5da] text-slate-700'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f]`}
                            >
                                Choose another time
                            </button>
                        )}
                    </aside>
                </div>
            </main>
        </div>
    );
}
