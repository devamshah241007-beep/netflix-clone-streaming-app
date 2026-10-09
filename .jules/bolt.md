## 2024-10-09 - Ensure Temporary Playwright Scripts are Deleted Before Committing
**Learning:** Temporary verification scripts like `verify_search.py` left in the workspace can litter the repository and get accidentally committed if not properly removed. This causes a dirty working tree or unnecessary files in a PR.
**Action:** When running visual verification scripts through Playwright, ensure that a step is included or executed to delete these temporary files (e.g. `rm /home/jules/verification/verify_search.py`) before final PR creation or `submit`.
