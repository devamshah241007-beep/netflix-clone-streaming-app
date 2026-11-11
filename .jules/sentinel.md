## 2025-02-15 - [CRITICAL] Prevent Hardcoded JWT Secret Fallback
**Vulnerability:** The application used a hardcoded string ('your_jwt_secret_change_this') as a fallback for `JWT_SECRET` in both authentication middleware and routes. If the `JWT_SECRET` environment variable wasn't set, attackers could forge valid JWTs.
**Learning:** Hardcoded default secrets are a severe vulnerability because they are committed to version control and publicly known. Generating random fallback keys on startup introduces a separate vulnerability where active sessions are invalidated upon server restart and might cause load balancing issues or race conditions with imports.
**Prevention:** Always enforce a fail-fast startup. If a critical security parameter like a cryptographic key is missing, throw an immediate `Error` preventing the app from starting up rather than silently degrading into an insecure or transiently-secure state.

## 2025-02-16 - [CRITICAL] Prevent NoSQL Injection in Express Query Parameters
**Vulnerability:** The application passed `req.query` parameters (`type`, `genre`, `search`, `profileId`) directly into Mongoose queries without type validation. Because Express parses bracketed query strings (e.g., `?type[$ne]=movie`) into objects, attackers could perform NoSQL injection.
**Learning:** When using Express with Mongoose, `req.query` values are not guaranteed to be strings. Passing them blindly to database functions allows MongoDB query operators to be injected.
**Prevention:** Always explicitly validate that optional `req.query` parameters are strings (e.g., `if (param && typeof param !== 'string')`) before building database queries, or use a robust validation library to enforce schema types on all incoming request data.
