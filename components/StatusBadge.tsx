import { statusClassName, statusLabel } from "@/lib/status";

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClassName(status)}`}>
      {statusLabel(status)}
    </span>
  );
}
