import { ApolloServer } from '@apollo/server';

import { schema } from './schema';
import { Application } from 'express';
import { expressMiddleware } from '@apollo/server/express4';

export const graphqlServer = new ApolloServer({
  schema,
});

export async function applyGraphqlMiddleware(app: Application) {
  await graphqlServer.start();
  app.use('/graphql', expressMiddleware(graphqlServer));
}