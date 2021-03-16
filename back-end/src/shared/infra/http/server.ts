import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';
import routes from './routes';
import globalExceptionHandler from './middlewares/globalExceptionHandler';

import '../typeorm/index';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', routes);

app.use(errors());

app.get('/', (request, response) => {
    return response.json('Hello World!');
});

app.use(globalExceptionHandler);

// eslint-disable-next-line no-console
app.listen(3333, () => console.log("🤞️ It's running..."));
