## 2024-05-14 - Absolute Paths in Playwright Verification Scripts
**Learning:** The project root directory in the execution environment is `/app`, not `/workspace`. Using `file:///workspace/public/index.html` in temporary Playwright verification scripts will result in a `net::ERR_FILE_NOT_FOUND` error.
**Action:** When writing scripts that rely on absolute file paths (e.g., navigating to static frontend files directly), always use `/app` as the base directory.
