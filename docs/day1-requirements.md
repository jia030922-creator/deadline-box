# Deadline Box Day 1 Requirements

## Goal

Build the first working loop:

Create task → Set DDL → Submit task → Judge status → Record status log.

## Tech Stack

- Next.js App Router
- TypeScript
- Prisma
- SQLite for local MVP
- Tailwind CSS

## Core Pages

1. `/tasks` - Today's DDL task list
2. `/tasks/new` - Create task
3. `/tasks/[id]` - Task detail
4. `/tasks/[id]/submit` - Submit task

## Database Tables

Only create these 4 tables for Day 1:

1. users
2. tasks
3. submissions
4. task_status_logs

## Status Rules

- Before DDL submission = ON_TIME
- After DDL submission = LATE
- If task is past DDL and has no submission = MISSED
- If task was MISSED and then submitted = LATE_MAKEUP
- Status changes must be written to task_status_logs

## Day 1 Acceptance Criteria

- User can create a task with title, type, due date, deliverable type, and standards.
- User can see tasks in `/tasks`.
- User can open task detail.
- User can submit text or link.
- System compares submittedAt with dueAt.
- System shows ON_TIME or LATE.
- System writes a submission record.
- System writes a task status log.
- Expired unsubmitted tasks are marked as MISSED when task list loads.
