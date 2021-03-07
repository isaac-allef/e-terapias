import { Request, Response } from 'express';
import CreateFieldJournalService from '../../services/CreateFieldJournalService';
import FieldJournalRepository from '../../typeorm/repositories/FieldJournalRepository';
import FieldRepository from '../../typeorm/repositories/FieldRepository';
import ModeratorRepository from '../../typeorm/repositories/ModeratorRepository';

class FieldJournalController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { title, fields, eterapiaId, moderatorId } = request.body;

        const fieldJournalRepository = new FieldJournalRepository();
        const fieldRepository = new FieldRepository();
        const moderatorRepository = new ModeratorRepository();

        const createFieldJournal = new CreateFieldJournalService(
            fieldJournalRepository,
            fieldRepository,
            moderatorRepository,
        );

        const fieldJournal = await createFieldJournal.execute({
            title,
            fields,
            eterapiaId,
            moderatorId,
        });

        return response.json(fieldJournal);
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const fieldJournalRepository = new FieldJournalRepository();

        const fieldJournals = await fieldJournalRepository.all();

        return response.json(fieldJournals);
    }
}

export default FieldJournalController;
