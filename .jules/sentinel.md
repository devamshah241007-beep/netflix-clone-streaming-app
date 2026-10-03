## 2025-02-15 - [CRITICAL] Prevent Hardcoded JWT Secret Fallback
**Vulnerability:** The application used a hardcoded string ('your_jwt_secret_change_this') as a fallback for `JWT_SECRET` in both authentication middleware and routes. If the `JWT_SECRET` environment variable wasn't set, attackers could forge valid JWTs.
**Learning:** Hardcoded default secrets are a severe vulnerability because they are committed to version control and publicly known. Generating random fallback keys on startup introduces a separate vulnerability where active sessions are invalidated upon server restart and might cause load balancing issues or race conditions with imports.
**Prevention:** Always enforce a fail-fast startup. If a critical security parameter like a cryptographic key is missing, throw an immediate `Error` preventing the app from starting up rather than silently degrading into an insecure or transiently-secure state.

## 2025-03-09 - [HIGH] Fix NoSQL Injection and ReDoS in API routes
**Vulnerability:** The application was vulnerable to NoSQL operator injection because Express `req.query` parameters were used directly in Mongoose queries without type checking. It was also vulnerable to ReDoS (Regular Expression Denial of Service) because user input was used directly in `$regex` operations without escaping.
**Learning:** Always validate that query parameters are strings before using them in database queries to prevent attackers from passing objects (like `?param[$ne]=val`). Always escape user input before using it in a regular expression to prevent ReDoS attacks.
**Prevention:** Implement strict type checking (`typeof param === 'string' && param`) for query parameters and use a utility to escape regex characters (e.g., `param.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')`).
