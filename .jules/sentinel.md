## 2025-02-15 - [CRITICAL] Prevent Hardcoded JWT Secret Fallback
**Vulnerability:** The application used a hardcoded string ('your_jwt_secret_change_this') as a fallback for `JWT_SECRET` in both authentication middleware and routes. If the `JWT_SECRET` environment variable wasn't set, attackers could forge valid JWTs.
**Learning:** Hardcoded default secrets are a severe vulnerability because they are committed to version control and publicly known. Generating random fallback keys on startup introduces a separate vulnerability where active sessions are invalidated upon server restart and might cause load balancing issues or race conditions with imports.
**Prevention:** Always enforce a fail-fast startup. If a critical security parameter like a cryptographic key is missing, throw an immediate `Error` preventing the app from starting up rather than silently degrading into an insecure or transiently-secure state.

## 2026-11-10 - [CRITICAL] Fix NoSQL Injection via Express req.query
**Vulnerability:** The application used optional `req.query` parameters directly in Mongoose queries without type checking (e.g., `req.query.search`). Attackers could pass objects via query string (like `?search[$ne]=`) to perform NoSQL injection attacks.
**Learning:** Express automatically parses bracketed query parameters into JavaScript objects. If these are passed directly into Mongoose queries, it allows malicious operators to modify the query structure and bypass logic or extract unauthorized data.
**Prevention:** Always explicitly validate that optional `req.query` parameters are strings (e.g., `if (param && typeof param !== 'string')`) before passing them to database queries.
