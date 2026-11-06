import { useState } from 'react';
import MainLayout from "@/app/components/layout/MainLayout";
import BookASlotSection from "./sections/BookASlotSection";
import MapSection from "./sections/MapSection";
import BookCourtSection from "./sections/BookCourtSection";
import SidebarCourtSection from "./sections/SidebarCourtSection";

export default function CourtPage() {
    const [selectedCourt, setSelectedCourt] = useState(null);
    const [showSlotPicker, setShowSlotPicker] = useState(false);
    const [savedCourts, setSavedCourts] = useState([]);
    const isSelectedCourtSaved = selectedCourt
        ? savedCourts.includes(selectedCourt.name)
        : false;

    const toggleSavedCourt = (courtName) => {
        setSavedCourts((current) =>
            current.includes(courtName)
                ? current.filter((name) => name !== courtName)
                : [...current, courtName],
        );
    };

    return (
        <MainLayout
            title="Courts near you"
            subtitle="Near Fuente Osmeña Circle"
            mapContent={({ darkMode }) => <MapSection darkMode={darkMode} />}
            fullContent={selectedCourt
                ? ({ darkMode }) => showSlotPicker
                    ? (
                          <BookASlotSection
                              court={selectedCourt}
                              darkMode={darkMode}
                              onBack={() => setShowSlotPicker(false)}
                              onDone={() => {
                                  setShowSlotPicker(false);
                                  setSelectedCourt(null);
                              }}
                          />
                      )
                    : (
                          <BookCourtSection
                              court={selectedCourt}
                              darkMode={darkMode}
                              isSaved={isSelectedCourtSaved}
                              onBack={() => setSelectedCourt(null)}
                              onBookSlot={() => setShowSlotPicker(true)}
                              onToggleSaved={toggleSavedCourt}
                          />
                      )
                : null}
        >
            {({ darkMode }) => (
                <SidebarCourtSection
                    darkMode={darkMode}
                    savedCourts={savedCourts}
                    onToggleSaved={toggleSavedCourt}
                    onSelectCourt={(court) => {
                        setShowSlotPicker(false);
                        setSelectedCourt(court);
                    }}
                />
            )}
        </MainLayout>
    );
}
