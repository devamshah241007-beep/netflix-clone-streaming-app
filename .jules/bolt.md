## 2026-10-30 - Debounce Implementation in Vanilla JS
**Learning:** When implementing wrapper functions like `debounce` in vanilla JavaScript, ensure the execution context is preserved by using `func.apply(this, args)` instead of `func(...args)` so the callback retains its binding to the original DOM element.
**Action:** Always implement debounce and throttle utilities with context preservation to ensure they work smoothly as vanilla DOM event handlers.
