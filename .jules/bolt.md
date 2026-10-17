## 2025-02-15 - [Vanilla JS Execution Context in Wrappers]
**Learning:** When implementing wrapper functions like `debounce` in vanilla JavaScript, especially for DOM event listeners, preserving the execution context (`this`) and arguments is crucial. Failing to do so can break event handlers that rely on the DOM element's context.
**Action:** Always use `func.apply(this, args)` instead of just `func(...args)` in custom vanilla JS utility wrappers to ensure the callback retains its binding to the original DOM element.
