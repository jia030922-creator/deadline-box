import Link from "next/link";

export function PageHeader({ title, actionHref, actionLabel }: { title: string; actionHref?: string; actionLabel?: string }) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <div>
        <Link href="/tasks" className="text-sm font-medium text-stone-600 hover:text-stone-950">
          Deadline Box
        </Link>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-950">{title}</h1>
      </div>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="rounded-md bg-stone-950 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-800"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
