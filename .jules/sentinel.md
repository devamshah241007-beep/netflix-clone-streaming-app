## 2025-02-15 - [CRITICAL] Prevent Hardcoded JWT Secret Fallback
**Vulnerability:** The application used a hardcoded string ('your_jwt_secret_change_this') as a fallback for `JWT_SECRET` in both authentication middleware and routes. If the `JWT_SECRET` environment variable wasn't set, attackers could forge valid JWTs.
**Learning:** Hardcoded default secrets are a severe vulnerability because they are committed to version control and publicly known. Generating random fallback keys on startup introduces a separate vulnerability where active sessions are invalidated upon server restart and might cause load balancing issues or race conditions with imports.
**Prevention:** Always enforce a fail-fast startup. If a critical security parameter like a cryptographic key is missing, throw an immediate `Error` preventing the app from starting up rather than silently degrading into an insecure or transiently-secure state.
## 2026-10-16 - NoSQL Operator Injection and ReDoS via req.query
**Vulnerability:** Unvalidated `req.query` properties in Express allowed malicious users to pass MongoDB operator objects (like ``, ``) or complex unescaped regex strings to `Mongoose.find()`. This could bypass query logic or cause ReDoS.
**Learning:** Express implicitly parses query strings into nested objects unless extended parsing is disabled. Directly passing these to Mongoose allows NoSQL injection.
**Prevention:** Always validate that `req.query` values are strings before using them in database queries, and always escape user input before passing it to `$regex`.
