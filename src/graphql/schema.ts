import { makeSchema } from 'nexus';
import path from 'path';

import * as types from './resources';

export const schema = makeSchema({
  types,
  outputs: {
    schema: path.join(process.cwd(), 'schema.graphql'),
    typegen: path.join(process.cwd(), 'nexus-typegen.ts'),
  },
});