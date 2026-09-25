## 2025-02-15 - [CRITICAL] Prevent Hardcoded JWT Secret Fallback
**Vulnerability:** The application used a hardcoded string ('your_jwt_secret_change_this') as a fallback for `JWT_SECRET` in both authentication middleware and routes. If the `JWT_SECRET` environment variable wasn't set, attackers could forge valid JWTs.
**Learning:** Hardcoded default secrets are a severe vulnerability because they are committed to version control and publicly known. Generating random fallback keys on startup introduces a separate vulnerability where active sessions are invalidated upon server restart and might cause load balancing issues or race conditions with imports.
**Prevention:** Always enforce a fail-fast startup. If a critical security parameter like a cryptographic key is missing, throw an immediate `Error` preventing the app from starting up rather than silently degrading into an insecure or transiently-secure state.

## 2025-09-25 - [CRITICAL] Prevent NoSQL Injection and ReDoS via req.query
**Vulnerability:** Express `req.query` parses arrays and objects by default, allowing attackers to pass MongoDB query operators (like `$ne`, `$gt`) directly into Mongoose queries. Unescaped `search` strings passed to `$regex` were also causing a Regular Expression Denial of Service (ReDoS) vulnerability.
**Learning:** Never pass unvalidated `req.query` directly into Mongoose `find()` or `$regex`. Express's extended query parser exposes unexpected data types, and user input can easily exploit MongoDB operators or halt the thread through catastrophic regex backtracking.
**Prevention:** Always strictly enforce `typeof param === 'string'` before using `req.query` in Mongoose queries and explicitly escape all regex special characters using a sanitization helper before applying `$regex`.
