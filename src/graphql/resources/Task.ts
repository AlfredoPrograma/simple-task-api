/* eslint-disable @typescript-eslint/no-unused-expressions */
import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus';
import * as tasksService from '@/services/tasks';

export const Task = objectType({
  name: 'Task',
  definition: (t) => {
    t.nonNull.int('id'),
    t.nonNull.string('title'),
    t.string('description'),
    t.nonNull.boolean('completed');
  },
});

export const GetAllTasksQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.nonNull.list.field('getAllTasks', {
      type: 'Task',
      resolve: async () => {
        const foundTasks = await tasksService.getAll();

        return foundTasks;
      },
    });
  },
});

export const CreateTaskMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createTask', {
      type: 'Task',
      args: {
        title: nonNull(stringArg()),
        description: stringArg(),
      },
      resolve: async (_, args) => {
        const { title, description } = args;

        return tasksService.create({ title, description, completed: false });
      },
    });
  },
});

export const UpdateTaskMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updateTask', {
      type: 'Task',
      args: {
        id: nonNull(intArg()),
        title: nonNull(stringArg()),
        description: stringArg(),
      },
      resolve: async (_, args) => {
        const { id, title, description } = args;

        return tasksService.update(id, { title, description });
      },
    });
  },
});

export const RemoveTaskMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('removeTask', {
      type: 'Task',
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_, args) => {
        const { id } = args;

        return tasksService.remove(id);
      },
    });    
  },
});