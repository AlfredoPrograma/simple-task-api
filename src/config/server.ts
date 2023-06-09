import { Application } from 'express';

export function runServerAndListen(app: Application) {
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
  });
}