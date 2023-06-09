import { prisma } from '@/database/client';
import { Prisma } from '@prisma/client';

export async function getAll() {
  try {
    return await prisma.task.findMany();
  } catch (err) {
    throw new Error('Error getting all tasks', { cause: err });
  }
}

export async function create(task: Prisma.TaskCreateInput) {
  try {
    return await prisma.task.create({ data: task });
  } catch (err) {
    throw new Error('Error creating task', { cause: err });
  }
}

export async function update(taskId: number, task: Prisma.TaskUpdateInput) {
  try {
    return await prisma.task.update({ where: { id: taskId }, data: task });
  } catch (err) {
    throw new Error('Error updating task', { cause: err });
  }
}

export async function remove(taskId: number) {
  try {
    return await prisma.task.delete({ where: { id: taskId } });
  } catch (err) {
    throw new Error('Error deleting task', { cause: err });
  }
}