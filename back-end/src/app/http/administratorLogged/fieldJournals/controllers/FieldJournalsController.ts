import { Request, Response } from 'express';
import FieldJournalRepository from '../../../../../domains/fieldJournals/infra/typeorm/repositories/FieldJournalRepository';
import AdministratorDeleteFieldJournalService from '../../../../../domains/fieldJournals/services/AdministratorDeleteFieldJournalService';
import AdministratorShowFieldJournalService from '../../../../../domains/fieldJournals/services/AdministratorShowFieldJournalService';

class FieldJournalsController {
    public async list(request: Request, response: Response): Promise<Response> {
        const fieldJournalRepository = new FieldJournalRepository();
        const {
            relations,
            orderBy,
            orderMethod,
            page,
            limit,
            search,
        } = request.query;

        const fieldJournals = await fieldJournalRepository.all({
            orderBy: orderBy as 'title' | 'created_at' | 'updated_at',
            orderMethod: orderMethod as 'ASC' | 'DESC',
            page: (page as unknown) as number,
            limit: (limit as unknown) as number,
            relations: relations as ['moderator' | 'eterapia'],
            search: search as string,
        });

        return response.json(fieldJournals);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { relations } = request.query;

        const fieldJournalRepository = new FieldJournalRepository();

        const administratorShowFieldJournal = new AdministratorShowFieldJournalService(
            fieldJournalRepository,
        );
        const fieldJournal = await administratorShowFieldJournal.execute({
            id,
            relations: relations as ['moderator' | 'eterapia'],
        });

        return response.json(fieldJournal);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const fieldJournalRepository = new FieldJournalRepository();

        const administratorDeleteFieldJournal = new AdministratorDeleteFieldJournalService(
            fieldJournalRepository,
        );

        const fieldJournal = await administratorDeleteFieldJournal.execute({
            id,
        });

        return response.json(fieldJournal);
    }
}

export default FieldJournalsController;
