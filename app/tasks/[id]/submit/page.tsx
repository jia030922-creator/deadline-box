import { notFound } from "next/navigation";
import { submitTask } from "@/app/tasks/actions";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { prisma } from "@/lib/prisma";
import { getMvpUser } from "@/lib/tasks";

export default async function SubmitTaskPage({ params }: { params: { id: string } }) {
  const user = await getMvpUser();
  const task = await prisma.task.findFirst({
    where: {
      id: params.id,
      userId: user.id
    }
  });

  if (!task) {
    notFound();
  }

  const submitTaskForId = submitTask.bind(null, task.id);

  return (
    <>
      <PageHeader title="Submit task" />

      <div className="mb-6 rounded-md border border-stone-200 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-stone-950">{task.title}</h2>
            <p className="mt-1 text-sm text-stone-600">DDL: {task.dueAt.toLocaleString()}</p>
          </div>
          <StatusBadge status={task.status} />
        </div>
      </div>

      <form action={submitTaskForId} className="space-y-5 rounded-md border border-stone-200 bg-white p-6">
        <div>
          <label htmlFor="kind" className="block text-sm font-medium text-stone-800">
            Submission type
          </label>
          <select id="kind" name="kind" required className="mt-2 w-full rounded-md border border-stone-300 px-3 py-2">
            <option value="TEXT">Text</option>
            <option value="LINK">Link</option>
          </select>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-stone-800">
            Submission
          </label>
          <textarea id="content" name="content" required rows={6} className="mt-2 w-full rounded-md border border-stone-300 px-3 py-2" />
        </div>

        <button type="submit" className="rounded-md bg-stone-950 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-800">
          Submit
        </button>
      </form>
    </>
  );
}
