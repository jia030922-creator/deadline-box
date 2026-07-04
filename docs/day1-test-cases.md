# Day 1 Manual Test Cases

## Case 1: On-time submission

1. Create task with DDL 1 hour later.
2. Submit text before DDL.
3. Expected status: ON_TIME.
4. Expected logs: PENDING → ON_TIME.

## Case 2: Late submission

1. Create task with DDL 5 minutes in the past.
2. Submit text.
3. Expected status: LATE.
4. Expected logs: PENDING → LATE.

## Case 3: Missed task

1. Create task with DDL in the past.
2. Do not submit.
3. Open `/tasks`.
4. Expected status: MISSED.
5. Expected logs: PENDING → MISSED.

## Case 4: Late makeup

1. Use a MISSED task.
2. Submit text.
3. Expected status: LATE_MAKEUP.
4. Expected logs: MISSED → LATE_MAKEUP.
