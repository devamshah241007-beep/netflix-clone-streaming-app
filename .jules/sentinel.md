## 2025-02-15 - [CRITICAL] Prevent Hardcoded JWT Secret Fallback
**Vulnerability:** The application used a hardcoded string ('your_jwt_secret_change_this') as a fallback for `JWT_SECRET` in both authentication middleware and routes. If the `JWT_SECRET` environment variable wasn't set, attackers could forge valid JWTs.
**Learning:** Hardcoded default secrets are a severe vulnerability because they are committed to version control and publicly known. Generating random fallback keys on startup introduces a separate vulnerability where active sessions are invalidated upon server restart and might cause load balancing issues or race conditions with imports.
**Prevention:** Always enforce a fail-fast startup. If a critical security parameter like a cryptographic key is missing, throw an immediate `Error` preventing the app from starting up rather than silently degrading into an insecure or transiently-secure state.

## 2025-10-24 - [CRITICAL] Prevent NoSQL Injection via Express Query Parser
**Vulnerability:** The application passed `req.query` properties (`type`, `genre`, `search`) directly into Mongoose queries in `routes/content.js` without type validation. Because Express parses bracketed query strings (e.g., `?type[$ne]=movie`) into objects, attackers could perform NoSQL injection.
**Learning:** In Express/Mongoose applications, optional query parameters must be explicitly validated as strings before being used in database queries. Relying on default parsing allows attackers to inject MongoDB operators.
**Prevention:** Always validate that `req.query` parameters are strings (e.g., `if (param && typeof param !== 'string')`) before using them in MongoDB query objects to prevent object injection.
