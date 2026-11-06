### Phase 5: Enable login form submission

- **Timestamp:** 2026-11-03
- **Mode:** Agent
- **Persona(s) Active:** 🏗️ Tech Lead, ⚙️ Backend, 🧪 QA
- **Files Modified/Created:**
  - `resources/js/Pages/Auth/Login.jsx` — Set the login button type to `submit` so it invokes the form's Inertia submission handler.
- **Issues Encountered:** The shared `PrimaryButton` defaults to `type="button"`, preventing the login form from submitting when the button was clicked.
- **Resolution:** Explicitly set `type="submit"` on the login page button.
- **QA Checklist Result:** ✅ Browser login with the seeded verified account reached `/admin/bookings` and rendered the authenticated admin shell and demo records. ✅ Authentication feature tests: 4 passed, 8 assertions. ✅ No backend, schema, or credential changes were made. Browser still reports the unrelated existing React `isFocused` prop warning.
- **Next Steps:** None for this login fix; the admin pages remain demo-only and their mutations are not persisted.
