## 2025-02-15 - [CRITICAL] Prevent Hardcoded JWT Secret Fallback
**Vulnerability:** The application used a hardcoded string ('your_jwt_secret_change_this') as a fallback for `JWT_SECRET` in both authentication middleware and routes. If the `JWT_SECRET` environment variable wasn't set, attackers could forge valid JWTs.
**Learning:** Hardcoded default secrets are a severe vulnerability because they are committed to version control and publicly known. Generating random fallback keys on startup introduces a separate vulnerability where active sessions are invalidated upon server restart and might cause load balancing issues or race conditions with imports.
**Prevention:** Always enforce a fail-fast startup. If a critical security parameter like a cryptographic key is missing, throw an immediate `Error` preventing the app from starting up rather than silently degrading into an insecure or transiently-secure state.

## 2025-02-16 - [CRITICAL] Prevent NoSQL Injection via Express Query Parser
**Vulnerability:** The application used `req.query` parameters (like `type`, `genre`, `search`, and `profileId`) directly in Mongoose queries without type validation. An attacker could pass objects via query string (e.g., `?type[$ne]=movie`) to manipulate database queries.
**Learning:** Express parses bracketed query strings into objects. When passed directly to MongoDB/Mongoose, these objects are interpreted as query operators. This creates a severe NoSQL injection vulnerability that can lead to data exfiltration or bypassing intended constraints.
**Prevention:** Always validate that `req.query` parameters are strictly strings before using them in database queries, for example by checking `if (param && typeof param !== 'string')`.
