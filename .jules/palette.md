## 2024-10-11 - [ARIA Labels for Interactivity]
**Learning:** Found multiple instances where critical interactive elements (like modal close buttons and form inputs without visible labels) lacked ARIA labels. This severely impacts screen reader accessibility. Adding ARIA labels provides clear context without altering the visual design.
**Action:** Always verify that icon-only buttons and inputs relying solely on placeholders have an `aria-label` attribute to ensure they are accessible.
