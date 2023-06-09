import { initEnv } from '@/config/env';
import { runServerAndListen } from '@/config/server';

import app from './app';

initEnv();
runServerAndListen(app);

