import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import globalExceptionHandler from '../middlewares/globalExceptionHandler';

import 'express-async-errors';

import routes from '../routes/index';

const app = express();

app.use(cors());
app.use(express.json());

app.use(errors());

app.use(globalExceptionHandler);

app.use(routes);

export default app;
