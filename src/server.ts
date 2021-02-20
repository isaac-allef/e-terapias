import express from 'express';
import eterapiasRoute from './routes/eterapias.routes';
import fieldJournalTemplatesRoute from './routes/fieldJournalTemplates.routes';
import moderatorsRoute from './routes/moderators.routes';
import fieldJournalsRoute from './routes/fieldJournals.routes';

const app = express();

app.use(express.json());

app.use('/eterapias', eterapiasRoute);
app.use('/fieldjournaltemplates', fieldJournalTemplatesRoute);
app.use('/moderators', moderatorsRoute);
app.use('/fieldjournals', fieldJournalsRoute);

app.get('/', (request, response) => {
    return response.json('Hello World!');
});

// eslint-disable-next-line no-console
app.listen(3333, () => console.log("🤞️ It's running..."));
