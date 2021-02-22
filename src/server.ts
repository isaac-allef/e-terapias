import 'reflect-metadata';
import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.use('/', routes);

app.get('/', (request, response) => {
    return response.json('Hello World!');
});

// eslint-disable-next-line no-console
app.listen(3333, () => console.log("🤞️ It's running..."));
