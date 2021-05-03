/* eslint-disable no-console */
import 'reflect-metadata';
import '../../infra/db/typeorm/index';
import * as dotenv from 'dotenv';
import { errors } from 'celebrate';
import cors from 'cors';
import 'express-async-errors';
import globalExceptionHandler from './middlewares/globalExceptionHandler';
import app from './config/app';

import { env } from './config/env';

dotenv.config();

app.use(cors());

app.use(errors());

app.use(globalExceptionHandler);

app.listen(env.port, () =>
    console.log(`🤞️ It's running at: http://localhost:${env.port}`),
);
