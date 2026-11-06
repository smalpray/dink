### Phase 1: Adding an interactive courts map

- **Timestamp:** 2026-11-03T18:27:00+08:00
- **Mode:** Agent
- **Persona(s) Active:** 🏗️ Tech Lead + 🖥️ Frontend + 🎨 UI/UX + 🧪 QA
- **Files Modified/Created:**
  - `package.json` — added Leaflet and React-Leaflet 4 for React 18 compatibility
  - `package-lock.json` — recorded the map dependencies
  - `resources/js/app/dashboard/sections/MapSection.jsx` — implemented the OpenStreetMap tile view, sample price markers, availability legend, and marker popups
  - `resources/js/app/dashboard/page.jsx` — placed the interactive map beside the scrollable courts list on desktop
  - `resources/css/app.css` — styled status-colored map markers
- **Issues Encountered:** Latest React-Leaflet 5 requires React 19; this app uses React 18.
- **Resolution:** Installed React-Leaflet 4.2.1, compatible with the project's React version.
- **QA Checklist Result:**
  - ✅ JavaScript only; no TypeScript introduced.
  - ✅ No Laravel routes, controllers, backend APIs, or database changes.
  - ✅ No Redux/RTK Query changes or server-state fetching.
  - ✅ Interactive price markers open local court detail popups.
  - ✅ OpenStreetMap attribution is present; no map API key required.
  - ✅ Responsive desktop split and compact-screen stacking are defined.
  - ✅ `npm run build` completed successfully.
  - ✅ Keyboard-operable map/list controls are provided by Leaflet and semantic buttons; requires browser verification.
  - ✅ Responsive layout and interactive map rendering: code-level pass; requires browser verification.
  - ✅ No guarded terminal commands were run.
- **Next Steps:** None.

### Phase 4: Matching the dark and light color themes

- **Timestamp:** 2026-11-03T18:55:00+08:00
- **Mode:** Agent
- **Persona(s) Active:** 🏗️ Tech Lead + 🖥️ Frontend + 🎨 UI/UX + 🧪 QA
- **Files Modified/Created:**
  - `resources/js/app/layout/MainLayout.jsx` — persisted dark/light preference and propagated the theme to the map dashboard
  - `resources/js/app/layout/Sidebar.jsx` — added the working mode toggle and matched dark navigation and lime active states
  - `resources/js/app/layout/Topbar.jsx` — added mode-aware search, filters, location chip, and typography
  - `resources/js/app/dashboard/page.jsx` — passed the selected mode to the dashboard sections
  - `resources/js/app/dashboard/sections/SidebarCourtSection.jsx` — styled cards and copy for dark mode while retaining white cards in light mode
  - `resources/js/app/dashboard/sections/MapSection.jsx` — switched the map to a dark visual in dark mode without an API-key tile service
  - `resources/css/app.css` — added a dark filter for OpenStreetMap tiles
- **Issues Encountered:** The initial Carto dark tile URL rendered an API-key watermark in browser preview.
- **Resolution:** Retained OpenStreetMap tiles and applied a dark filter to the tile pane, preserving OSM attribution and removing the key requirement.
- **QA Checklist Result:**
  - ✅ `npm run build` completed successfully.
  - ✅ Browser preview confirms light mode retains light/white surfaces.
  - ✅ Browser preview confirms dark mode uses deep green surfaces, lime active navigation, and a darkened map.
  - ✅ Browser reload confirms the dark preference persists.
  - ✅ Root route correctly highlights Courts in the navigation.
  - ✅ No backend or API changes; no guarded terminal commands.
  - ✅ Responsive behavior is code-level verified; requires testing at target mobile devices/sizes.
- **Next Steps:** None.

### Phase 2: Resolving the Onboarding module load error

- **Timestamp:** 2026-11-03T18:29:00+08:00
- **Mode:** Agent
- **Persona(s) Active:** 🏗️ Tech Lead + 🖥️ Frontend + 🧪 QA
- **Files Modified/Created:** None.
- **Issues Encountered:** The browser could not load the Onboarding module after the Leaflet dependencies were added. Vite returned 504 responses for optimized Leaflet modules.
- **Resolution:** Restarted the identified Vite dev server so it could rebuild its optimized dependency cache.
- **QA Checklist Result:**
  - ✅ Onboarding module responds with HTTP 200.
  - ✅ Leaflet and React-Leaflet optimized modules respond with HTTP 200.
  - ✅ Production frontend build remains successful from Phase 1.
  - ✅ No backend or application-code changes required.
- **Next Steps:** Refresh the browser if the previous failed import remains cached.

### Phase 3: Extending the map across the right side of the screen

- **Timestamp:** 2026-11-03T18:44:00+08:00
- **Mode:** Agent
- **Persona(s) Active:** 🏗️ Tech Lead + 🖥️ Frontend + 🎨 UI/UX + 🧪 QA
- **Files Modified/Created:**
  - `resources/js/app/layout/MainLayout.jsx` — added the full-height split layout for the court list and map while preserving the standard layout for other pages
  - `resources/js/app/layout/Sidebar.jsx` — adjusted the expanded nav rail width to match the reference proportions
  - `resources/js/app/layout/Topbar.jsx` — compacted the search/filter header for the list column
  - `resources/js/app/dashboard/page.jsx` — passed the map as a full-height sibling of the scrollable courts list
  - `resources/js/app/dashboard/sections/MapSection.jsx` — removed rounded-card constraints so the map fills the viewport area
- **Issues Encountered:** None.
- **Resolution:** None required.
- **QA Checklist Result:**
  - ✅ Plain JavaScript; no TypeScript added.
  - ✅ Non-map `MainLayout` pages retain their standard topbar and padded content layout.
  - ✅ Map and court-list layout is responsive, with a stacked map on smaller screens.
  - ✅ OpenStreetMap attribution and map controls remain visible.
  - ✅ `npm run build` completed successfully.
  - ✅ Browser preview confirms the navigation, court panel, and map occupy the expected side-by-side regions; browser preview at 1259×650.
  - ✅ No backend changes or guarded terminal commands.
- **Next Steps:** None.
