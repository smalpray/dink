import { useState } from 'react';
import CourtPage from '@/app/court/page';
import HeroSection from './sections/HeroSection';
import WelcomeSection from './sections/WelcomeSection';
import LocationPermissionSection from './sections/LocationPermissionSection';
import ManualLocationSection from './sections/ManualLocationSection';

export default function OnboardingPage() {
    const [step, setStep] = useState('welcome');
    const [manualOpen, setManualOpen] = useState(false);
    const [isAppOpen, setIsAppOpen] = useState(false);

    const showWelcome = step === 'welcome';
    const showPermission = step === 'permission';

    const openApp = () => setIsAppOpen(true);

    if (isAppOpen) {
        return <CourtPage />;
    }

    return (
        <div className="min-h-screen bg-[#f4f2ef] text-slate-800">
            <div className="flex min-h-screen overflow-hidden">
                <HeroSection />

                <div className="relative flex-1 overflow-hidden bg-[#f4f2ef]">
                    {showWelcome && (
                        <WelcomeSection
                            onGetStarted={() => setStep('permission')}
                            onSkip={openApp}
                        />
                    )}

                    {showPermission && !manualOpen && (
                        <LocationPermissionSection
                            onAllow={openApp}
                            onManual={() => setManualOpen(true)}
                        />
                    )}

                    {showPermission && manualOpen && (
                        <>
                            <LocationPermissionSection
                                onAllow={openApp}
                                onManual={() => setManualOpen(true)}
                            />
                            <ManualLocationSection
                                onClose={() => setManualOpen(false)}
                                onSelect={openApp}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
