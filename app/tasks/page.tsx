import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { prisma } from "@/lib/prisma";
import { getMvpUser, markExpiredTasksMissed } from "@/lib/tasks";

export default async function TasksPage() {
  const user = await getMvpUser();
  await markExpiredTasksMissed(user.id);

  const tasks = await prisma.task.findMany({
    where: { userId: user.id },
    orderBy: [{ dueAt: "asc" }, { createdAt: "asc" }]
  });

  return (
    <>
      <PageHeader title="Tasks" actionHref="/tasks/new" actionLabel="New task" />

      {tasks.length === 0 ? (
        <div className="rounded-md border border-dashed border-stone-300 bg-white p-8 text-center">
          <p className="text-stone-700">No tasks yet.</p>
          <Link href="/tasks/new" className="mt-4 inline-flex rounded-md bg-stone-950 px-4 py-2 text-sm font-semibold text-white">
            Create the first task
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-stone-200 overflow-hidden rounded-md border border-stone-200 bg-white">
          {tasks.map((task) => (
            <Link key={task.id} href={`/tasks/${task.id}`} className="block p-5 hover:bg-stone-50">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-stone-950">{task.title}</h2>
                  <p className="mt-1 text-sm text-stone-600">
                    DDL: {task.dueAt.toLocaleString()} · {task.deliverableType}
                  </p>
                </div>
                <StatusBadge status={task.status} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
