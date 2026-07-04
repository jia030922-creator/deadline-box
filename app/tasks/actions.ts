"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getMvpUser, writeStatusLog } from "@/lib/tasks";
import { SubmissionKind, statusForSubmission } from "@/lib/status";

function requireString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${key} is required.`);
  }

  return value.trim();
}

export async function createTask(formData: FormData) {
  const user = await getMvpUser();
  const title = requireString(formData, "title");
  const type = requireString(formData, "type");
  const dueAtValue = requireString(formData, "dueAt");
  const deliverableType = requireString(formData, "deliverableType");
  const standards = requireString(formData, "standards");
  const dueAt = new Date(dueAtValue);

  if (Number.isNaN(dueAt.getTime())) {
    throw new Error("DDL must be a valid date and time.");
  }

  const task = await prisma.task.create({
    data: {
      userId: user.id,
      title,
      type,
      dueAt,
      deliverableType,
      standards
    }
  });

  await writeStatusLog(task.id, null, "PENDING", "Task created.");

  revalidatePath("/tasks");
  redirect(`/tasks/${task.id}`);
}

export async function submitTask(taskId: string, formData: FormData) {
  const user = await getMvpUser();
  const kindValue = requireString(formData, "kind");
  const content = requireString(formData, "content");

  if (kindValue !== "TEXT" && kindValue !== "LINK") {
    throw new Error("Submission must be text or link.");
  }

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId: user.id
    }
  });

  if (!task) {
    throw new Error("Task not found.");
  }

  const submittedAt = new Date();
  const nextStatus = statusForSubmission(task.dueAt, submittedAt, task.status);
  const kind: SubmissionKind = kindValue;

  await prisma.$transaction([
    prisma.submission.create({
      data: {
        taskId: task.id,
        userId: user.id,
        kind,
        content,
        submittedAt,
        status: nextStatus
      }
    }),
    prisma.task.update({
      where: { id: task.id },
      data: { status: nextStatus }
    }),
    prisma.taskStatusLog.create({
      data: {
        taskId: task.id,
        fromStatus: task.status,
        toStatus: nextStatus,
        reason: "Task submitted."
      }
    })
  ]);

  revalidatePath("/tasks");
  revalidatePath(`/tasks/${task.id}`);
  redirect(`/tasks/${task.id}`);
}
