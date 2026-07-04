import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { prisma } from "@/lib/prisma";
import { getMvpUser } from "@/lib/tasks";

export default async function TaskDetailPage({ params }: { params: { id: string } }) {
  const user = await getMvpUser();
  const task = await prisma.task.findFirst({
    where: {
      id: params.id,
      userId: user.id
    },
    include: {
      submissions: { orderBy: { submittedAt: "desc" } },
      statusLogs: { orderBy: { createdAt: "asc" } }
    }
  });

  if (!task) {
    notFound();
  }

  return (
    <>
      <PageHeader title={task.title} actionHref={`/tasks/${task.id}/submit`} actionLabel="Submit" />

      <div className="space-y-6">
        <section className="rounded-md border border-stone-200 bg-white p-6">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm text-stone-600">DDL</p>
              <p className="font-semibold text-stone-950">{task.dueAt.toLocaleString()}</p>
            </div>
            <StatusBadge status={task.status} />
          </div>
          <dl className="grid gap-4 md:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-stone-600">Type</dt>
              <dd className="mt-1 text-stone-950">{task.type}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-stone-600">Deliverable type</dt>
              <dd className="mt-1 text-stone-950">{task.deliverableType}</dd>
            </div>
            <div className="md:col-span-2">
              <dt className="text-sm font-medium text-stone-600">Standards</dt>
              <dd className="mt-1 whitespace-pre-wrap text-stone-950">{task.standards}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-md border border-stone-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-stone-950">Submissions</h2>
          {task.submissions.length === 0 ? (
            <p className="mt-3 text-sm text-stone-600">No submissions yet.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {task.submissions.map((submission) => (
                <div key={submission.id} className="rounded-md border border-stone-200 p-4">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium text-stone-700">
                      {submission.kind} · {submission.submittedAt.toLocaleString()}
                    </p>
                    <StatusBadge status={submission.status} />
                  </div>
                  <p className="whitespace-pre-wrap text-stone-950">{submission.content}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-md border border-stone-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-stone-950">Status log</h2>
          <ol className="mt-4 space-y-3">
            {task.statusLogs.map((log) => (
              <li key={log.id} className="text-sm text-stone-700">
                <span className="font-medium text-stone-950">{log.createdAt.toLocaleString()}</span>
                {" · "}
                {log.fromStatus ? `${log.fromStatus} -> ` : ""}
                {log.toStatus}
                {" · "}
                {log.reason}
              </li>
            ))}
          </ol>
        </section>

        <Link href="/tasks" className="inline-flex text-sm font-medium text-stone-700 hover:text-stone-950">
          Back to tasks
        </Link>
      </div>
    </>
  );
}
