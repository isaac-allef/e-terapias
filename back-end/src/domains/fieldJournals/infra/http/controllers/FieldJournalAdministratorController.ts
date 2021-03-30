import { Request, Response } from 'express';
import FieldJournalRepository from '../../typeorm/repositories/FieldJournalRepository';
import AdministratorDeleteFieldJournalService from '../../../services/AdministratorDeleteFieldJournalService';
import AdministratorShowFieldJournalService from '../../../services/AdministratorShowFieldJournalService';

class FieldJournalAdministratorController {
    public async list(request: Request, response: Response): Promise<Response> {
        const fieldJournalRepository = new FieldJournalRepository();
        const {
            search,
            relations,
            orderBy,
            orderMethod,
            page,
            limit,
        } = request.query;

        const fieldJournals = await fieldJournalRepository.all({
            orderBy: orderBy as 'title' | 'created_at' | 'updated_at',
            orderMethod: orderMethod as 'ASC' | 'DESC',
            page: (page as unknown) as number,
            limit: (limit as unknown) as number,
            search: search as string,
            relations: relations as ['moderator' | 'eterapia'],
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

export default FieldJournalAdministratorController;
