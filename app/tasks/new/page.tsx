import { PageHeader } from "@/components/PageHeader";
import { createTask } from "@/app/tasks/actions";

export default function NewTaskPage() {
  return (
    <>
      <PageHeader title="New task" />

      <form action={createTask} className="space-y-5 rounded-md border border-stone-200 bg-white p-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-stone-800">
            Title
          </label>
          <input id="title" name="title" required className="mt-2 w-full rounded-md border border-stone-300 px-3 py-2" />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-stone-800">
              Type
            </label>
            <input id="type" name="type" required className="mt-2 w-full rounded-md border border-stone-300 px-3 py-2" />
          </div>
          <div>
            <label htmlFor="deliverableType" className="block text-sm font-medium text-stone-800">
              Deliverable type
            </label>
            <input id="deliverableType" name="deliverableType" required className="mt-2 w-full rounded-md border border-stone-300 px-3 py-2" />
          </div>
        </div>

        <div>
          <label htmlFor="dueAt" className="block text-sm font-medium text-stone-800">
            DDL
          </label>
          <input id="dueAt" name="dueAt" type="datetime-local" required className="mt-2 w-full rounded-md border border-stone-300 px-3 py-2" />
        </div>

        <div>
          <label htmlFor="standards" className="block text-sm font-medium text-stone-800">
            Standards
          </label>
          <textarea id="standards" name="standards" required rows={5} className="mt-2 w-full rounded-md border border-stone-300 px-3 py-2" />
        </div>

        <button type="submit" className="rounded-md bg-stone-950 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-800">
          Create task
        </button>
      </form>
    </>
  );
}
