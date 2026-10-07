## 2024-10-07 - Playwright Verification Timouts with file:///

**Learning:** When visually verifying the static frontend with Playwright via the `file:///` protocol, `page.screenshot()` may time out waiting for external webfonts to load.
**Action:** Always mock out webfont endpoints, disable font subpixel rendering with args, and bypass CSS animations via `animations="disabled"` when taking screenshots. Alternatively, force the font loading promise to resolve manually.
