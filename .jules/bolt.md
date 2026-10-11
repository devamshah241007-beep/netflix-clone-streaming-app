## 2024-05-24 - Debouncing Frontend Search
**Learning:** In vanilla JavaScript apps lacking framework reactivity, frequent synchronous events (like `input` typing) directly trigger DOM manipulation and array filtering logic, leading to noticeable performance degradation and jank on every keystroke if left unhandled.
**Action:** Always wrap frequent, UI-blocking event handlers (like search inputs or window resizes) in a `debounce` or `throttle` utility, ensuring the execution context (`this`) and arguments are preserved to maintain correct functionality.
