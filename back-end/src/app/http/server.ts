/* eslint-disable no-console */
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { env } from './config/env';
import 'express-async-errors';

import connTypeorm from '../../infra/db/typeorm/index';

dotenv.config();

connTypeorm.then(async () => {
    const app = (await import('./config/app')).default;

    app.listen(env.port, () =>
        console.log(`🤞️ It's running at: http://localhost:${env.port}`),
    );
});
