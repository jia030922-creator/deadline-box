export type TaskStatus = "PENDING" | "ON_TIME" | "LATE" | "MISSED" | "LATE_MAKEUP";
export type SubmissionKind = "TEXT" | "LINK";

export function statusForSubmission(dueAt: Date, submittedAt: Date, currentStatus: string): TaskStatus {
  if (currentStatus === "MISSED") {
    return "LATE_MAKEUP";
  }

  return submittedAt <= dueAt ? "ON_TIME" : "LATE";
}

export function isExpiredUnsubmitted(dueAt: Date, now = new Date()) {
  return dueAt < now;
}

export function statusLabel(status: string) {
  return status.replace("_", " ");
}

export function statusClassName(status: string) {
  switch (status) {
    case "ON_TIME":
      return "border-green-200 bg-green-50 text-green-800";
    case "LATE":
      return "border-amber-200 bg-amber-50 text-amber-900";
    case "MISSED":
      return "border-red-200 bg-red-50 text-red-800";
    case "LATE_MAKEUP":
      return "border-orange-200 bg-orange-50 text-orange-900";
    default:
      return "border-stone-200 bg-stone-50 text-stone-700";
  }
}
