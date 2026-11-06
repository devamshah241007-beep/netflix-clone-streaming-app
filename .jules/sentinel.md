## 2025-02-15 - [CRITICAL] Prevent Hardcoded JWT Secret Fallback
**Vulnerability:** The application used a hardcoded string ('your_jwt_secret_change_this') as a fallback for `JWT_SECRET` in both authentication middleware and routes. If the `JWT_SECRET` environment variable wasn't set, attackers could forge valid JWTs.
**Learning:** Hardcoded default secrets are a severe vulnerability because they are committed to version control and publicly known. Generating random fallback keys on startup introduces a separate vulnerability where active sessions are invalidated upon server restart and might cause load balancing issues or race conditions with imports.
**Prevention:** Always enforce a fail-fast startup. If a critical security parameter like a cryptographic key is missing, throw an immediate `Error` preventing the app from starting up rather than silently degrading into an insecure or transiently-secure state.

## 2025-02-15 - [HIGH] Prevent NoSQL Injection in Express Query Parameters
**Vulnerability:** The application blindly accepted `req.query.type`, `req.query.genre`, and `req.query.search` in `routes/content.js` without type validation. Express parses bracketed query strings (like `?type[$ne]=movie`) into objects, passing them directly to Mongoose, allowing attackers to manipulate queries via NoSQL injection.
**Learning:** Implicitly passing raw `req.query` variables to database queries in Express apps is extremely dangerous because Express object parsing can bypass expected string matching logic.
**Prevention:** Always validate that optional `req.query` parameters are strings (e.g., `if (param && typeof param !== 'string')`) before using them in database queries to ensure they are treated as simple literal values and not operator objects.
