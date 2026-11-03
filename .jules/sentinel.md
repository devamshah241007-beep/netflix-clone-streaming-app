## 2025-02-15 - [CRITICAL] Prevent Hardcoded JWT Secret Fallback
**Vulnerability:** The application used a hardcoded string ('your_jwt_secret_change_this') as a fallback for `JWT_SECRET` in both authentication middleware and routes. If the `JWT_SECRET` environment variable wasn't set, attackers could forge valid JWTs.
**Learning:** Hardcoded default secrets are a severe vulnerability because they are committed to version control and publicly known. Generating random fallback keys on startup introduces a separate vulnerability where active sessions are invalidated upon server restart and might cause load balancing issues or race conditions with imports.
**Prevention:** Always enforce a fail-fast startup. If a critical security parameter like a cryptographic key is missing, throw an immediate `Error` preventing the app from starting up rather than silently degrading into an insecure or transiently-secure state.

## 2025-10-25 - [HIGH] Fix NoSQL Injection in Express Queries
**Vulnerability:** Express `req.query` parameters were passed directly to MongoDB queries without type validation, allowing attackers to inject NoSQL operators (like `$ne`) via query string objects (e.g., `?type[$ne]=movie`).
**Learning:** Express parses query strings into objects by default. When these objects are passed directly to Mongoose, it interprets them as query operators, potentially leading to unauthorized data access or NoSQL injection.
**Prevention:** Always validate that optional `req.query` parameters are strings (using `typeof param === 'string'`) before using them in database queries to ensure they are not objects containing NoSQL operators.
