/* eslint-disable @typescript-eslint/no-unused-expressions */
import { objectType } from 'nexus';

export const Task = objectType({
  name: 'Task',
  definition: (t) => {
    t.nonNull.int('id'),
    t.nonNull.string('title'),
    t.string('description'),
    t.nonNull.boolean('completed');
  },
});
