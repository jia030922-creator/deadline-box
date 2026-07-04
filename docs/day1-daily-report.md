\# Deadline Box Day 1 Daily Report



Date: 2026-07-04



\## 1. Today's Goal



Build the first working loop of Deadline Box:



Create task → Set DDL → Submit task → Judge status → Record status log.



Deadline Box is not a generic todo app. The Day 1 goal was to verify the core delivery mechanism.



\## 2. Completed Work



\- Created GitHub repository: `deadline-box`

\- Installed and used Codex CLI for AI-assisted development

\- Added project instruction files:

&#x20; - `AGENTS.md`

&#x20; - `docs/day1-requirements.md`

&#x20; - `docs/day1-test-cases.md`

\- Implemented Day 1 MVP with:

&#x20; - Next.js App Router

&#x20; - TypeScript

&#x20; - Tailwind CSS

&#x20; - Prisma

&#x20; - SQLite

\- Created four Day 1 database tables:

&#x20; - `users`

&#x20; - `tasks`

&#x20; - `submissions`

&#x20; - `task\_status\_logs`

\- Implemented required pages:

&#x20; - `/tasks`

&#x20; - `/tasks/new`

&#x20; - `/tasks/\[id]`

&#x20; - `/tasks/\[id]/submit`

\- Implemented core task status logic:

&#x20; - `PENDING`

&#x20; - `ON\_TIME`

&#x20; - `LATE`

&#x20; - `MISSED`

&#x20; - `LATE\_MAKEUP`

\- Implemented status log recording.

\- Pushed the Day 1 code to GitHub.



\## 3. Manual Test Results



\### Case 1: On-time submission



Result: Passed



Expected:



PENDING → ON\_TIME



Actual:



Task submitted before DDL and marked as ON\_TIME.



\### Case 2: Late submission



Result: Passed



Expected:



PENDING → LATE



Actual:



Task submitted after DDL and marked as LATE.



\### Case 3: Missed task



Result: Passed



Expected:



PENDING → MISSED



Actual:



Expired unsubmitted task was marked as MISSED.



\### Case 4: Late makeup



Result: Passed



Expected:



PENDING → MISSED → LATE\_MAKEUP



Actual:



The system first recorded the task as MISSED, then recorded the makeup submission as LATE\_MAKEUP.



This confirms the core principle:



A missed task can be made up, but it cannot be rewritten as on-time.



\## 4. Important Screenshot



The task detail page showed:



\- Submission history

\- Status log

\- PENDING → MISSED

\- MISSED → LATE\_MAKEUP



This proves that the Day 1 delivery loop works.



\## 5. Issues Found



\- `.env` was accidentally pushed to GitHub.

\- Current UI still uses test data such as task title `1`, `2`, `3`.

\- Task list page needs clearer display fields:

&#x20; - task title

&#x20; - task type

&#x20; - deliverable type

&#x20; - DDL

&#x20; - minimum standard

&#x20; - current status



\## 6. Fixes Needed Next



\- Stop tracking `.env`.

\- Add `.env.example`.

\- Improve task card display.

\- Improve task creation form labels.

\- Keep Day 2 focused on status machine and traceability.



\## 7. What I Learned



\- How to use Codex as an implementation assistant instead of a vague chatbot.

\- How to provide clear project instructions through `AGENTS.md`.

\- How to define a minimal MVP scope.

\- How to use Prisma with SQLite for a local MVP.

\- How to verify status transitions with manual test cases.

\- How to separate product requirements, implementation, and acceptance criteria.



\## 8. Day 1 Conclusion



Day 1 is complete.



The project now has a working core loop:



Create task → Set DDL → Submit task → Judge ON\_TIME / LATE / MISSED / LATE\_MAKEUP → Record status log.



This is the minimum foundation of Deadline Box as a personal delivery verification system.

