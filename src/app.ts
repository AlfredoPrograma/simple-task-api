import express, { Application } from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { errorHandler, notFoundHandler } from '@/middlewares/exceptionsHandlers';
import { applyGraphqlMiddleware } from '@/graphql/server';
import { prisma } from '@/database/client';

function loadEnv() {
  config();
}

async function connectDb() {
  try {
    await prisma.$connect();
  } catch (err) {
    console.error('Error connecting to database: ', err);
  }
}

async function loadMiddlewares(app: Application) {
  app.use(morgan('dev'));
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors());
  app.use(express.json());

  await applyGraphqlMiddleware(app);
}

function loadExceptionHandlers(app: Application) {
  app.use(notFoundHandler);
  app.use(errorHandler);
}

export async function runServerAndListen() {
  loadEnv();
  await connectDb();

  const port = process.env.PORT || 5000;
  const app = express();

  await loadMiddlewares(app);

  // TODO: Load routes here

  loadExceptionHandlers(app);

  app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
  });
}
