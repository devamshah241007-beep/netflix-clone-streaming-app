## 2025-02-15 - [CRITICAL] Prevent Hardcoded JWT Secret Fallback
**Vulnerability:** The application used a hardcoded string ('your_jwt_secret_change_this') as a fallback for `JWT_SECRET` in both authentication middleware and routes. If the `JWT_SECRET` environment variable wasn't set, attackers could forge valid JWTs.
**Learning:** Hardcoded default secrets are a severe vulnerability because they are committed to version control and publicly known. Generating random fallback keys on startup introduces a separate vulnerability where active sessions are invalidated upon server restart and might cause load balancing issues or race conditions with imports.
**Prevention:** Always enforce a fail-fast startup. If a critical security parameter like a cryptographic key is missing, throw an immediate `Error` preventing the app from starting up rather than silently degrading into an insecure or transiently-secure state.

## 2025-02-15 - [HIGH] Prevent ReDoS and NoSQL Injection in Express Query Parsing
**Vulnerability:** User-provided inputs from Express `req.query` (like `search`) were passed directly into Mongoose database queries. This introduces two vulnerabilities:
1. **ReDoS (Regular Expression Denial of Service):** Direct use of user input in `$regex` operations allows attackers to submit complex patterns (e.g., `^(a+)+$`) that consume excessive CPU, causing a denial of service.
2. **NoSQL Injection:** Express parses `req.query` values as strings *or* objects (if formatted as `?param[$ne]=value`). Passing an object directly into a query filter without validating it's a string can bypass expected matching logic.
**Learning:** Never trust the type or content of inputs parsed from `req.query`. Mongoose `$regex` relies on the V8 regex engine which is vulnerable to ReDoS if patterns aren't carefully restricted or escaped. Express `req.query` parameters must be explicitly validated as strings because the default query parser (`qs` or `querystring`) can create objects/arrays.
**Prevention:**
1. To prevent ReDoS, explicitly escape all special regex characters (e.g., `string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')`) when using user input in `$regex` searches.
2. To prevent NoSQL injection, explicitly validate that query parameters intended to be strings are indeed strings (e.g., `if (param && typeof param !== 'string') return res.status(400).json(...)`) before using them in database queries.
