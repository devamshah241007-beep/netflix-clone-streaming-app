## 2025-02-15 - [CRITICAL] Prevent Hardcoded JWT Secret Fallback
**Vulnerability:** The application used a hardcoded string ('your_jwt_secret_change_this') as a fallback for `JWT_SECRET` in both authentication middleware and routes. If the `JWT_SECRET` environment variable wasn't set, attackers could forge valid JWTs.
**Learning:** Hardcoded default secrets are a severe vulnerability because they are committed to version control and publicly known. Generating random fallback keys on startup introduces a separate vulnerability where active sessions are invalidated upon server restart and might cause load balancing issues or race conditions with imports.
**Prevention:** Always enforce a fail-fast startup. If a critical security parameter like a cryptographic key is missing, throw an immediate `Error` preventing the app from starting up rather than silently degrading into an insecure or transiently-secure state.

## $(date +%Y-%m-%d) - [NoSQL Injection in Optional Express Query Parameters]
**Vulnerability:** Optional express query parameters (`req.query.profileId`) were directly passed to Mongoose `findOne` queries or subjected to type-checks without verifying their existence.
**Learning:** Checking `if (typeof param !== 'string')` for an optional parameter introduces a regression because `typeof undefined` evaluates to `'undefined'`, which is not `'string'`, thus incorrectly triggering error branches for omitted fields.
**Prevention:** For optional express `req.query` parameters, explicitly verify their presence before validating their type (e.g., `if (param && typeof param !== 'string')`) to avoid breaking existing functionality while defending against NoSQL object injection.
