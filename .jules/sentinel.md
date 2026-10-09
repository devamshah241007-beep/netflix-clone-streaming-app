## 2025-02-15 - [CRITICAL] Prevent Hardcoded JWT Secret Fallback
**Vulnerability:** The application used a hardcoded string ('your_jwt_secret_change_this') as a fallback for `JWT_SECRET` in both authentication middleware and routes. If the `JWT_SECRET` environment variable wasn't set, attackers could forge valid JWTs.
**Learning:** Hardcoded default secrets are a severe vulnerability because they are committed to version control and publicly known. Generating random fallback keys on startup introduces a separate vulnerability where active sessions are invalidated upon server restart and might cause load balancing issues or race conditions with imports.
**Prevention:** Always enforce a fail-fast startup. If a critical security parameter like a cryptographic key is missing, throw an immediate `Error` preventing the app from starting up rather than silently degrading into an insecure or transiently-secure state.

## 2025-02-15 - [HIGH] Prevent NoSQL Injection and ReDoS in API Routes
**Vulnerability:** API routes parsing query strings (`req.query`) directly into Mongoose queries and `$regex` expressions without type checking or character escaping.
**Learning:** `req.query` params can be passed as objects (e.g. `?search[$ne]=`), opening the door to NoSQL operator injection in queries. Moreover, unescaped strings fed directly to `$regex` queries allow users to craft expensive matching patterns leading to Regular Expression Denial of Service (ReDoS).
**Prevention:** Always explicitly check `typeof param === 'string'` before executing Mongoose queries. For Mongoose `$regex` queries derived from user input, explicitly escape special regex characters (e.g., using `string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')`).
