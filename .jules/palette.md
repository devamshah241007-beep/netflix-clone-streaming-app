## 2024-10-10 - Playwright Modal Hidden State Timeout
**Learning:** When writing Playwright scripts to wait for a modal to close (i.e. become hidden), simply waiting for a `.hidden` class (like `await page.wait_for_selector("#detailsModal.hidden")`) might result in a 30s timeout because Playwright defaults to waiting for elements to be `visible`.
**Action:** Always use the explicit state parameter `state="hidden"` when waiting for an element to disappear or become hidden in Playwright (e.g., `await page.wait_for_selector("#detailsModal.hidden", state="hidden")`).
