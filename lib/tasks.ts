import { prisma } from "@/lib/prisma";
import { isExpiredUnsubmitted, TaskStatus } from "@/lib/status";

const MVP_USER_NAME = "Local MVP User";

export async function getMvpUser() {
  const existingUser = await prisma.user.findFirst({
    where: { name: MVP_USER_NAME }
  });

  if (existingUser) {
    return existingUser;
  }

  return prisma.user.create({
    data: { name: MVP_USER_NAME }
  });
}

export async function writeStatusLog(
  taskId: string,
  fromStatus: string | null,
  toStatus: TaskStatus,
  reason: string
) {
  return prisma.taskStatusLog.create({
    data: {
      taskId,
      fromStatus,
      toStatus,
      reason
    }
  });
}

export async function markExpiredTasksMissed(userId: string) {
  const pendingTasks = await prisma.task.findMany({
    where: {
      userId,
      status: "PENDING",
      submissions: { none: {} }
    }
  });

  const expiredTasks = pendingTasks.filter((task) => isExpiredUnsubmitted(task.dueAt));

  for (const task of expiredTasks) {
    await prisma.$transaction([
      prisma.task.update({
        where: { id: task.id },
        data: { status: "MISSED" }
      }),
      prisma.taskStatusLog.create({
        data: {
          taskId: task.id,
          fromStatus: "PENDING",
          toStatus: "MISSED",
          reason: "Task passed DDL without a submission."
        }
      })
    ]);
  }
}
