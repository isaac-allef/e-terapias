import { Request, Response } from 'express';
import FieldJournalRepository from '../../typeorm/repositories/FieldJournalRepository';
import AppError from '../../../../../shared/errors/AppError';

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

        const fieldJournals = await fieldJournalRepository.all(
            orderBy as 'title' | 'created_at' | 'updated_at',
            orderMethod as 'ASC' | 'DESC',
            (page as unknown) as number,
            (limit as unknown) as number,
            search as string,
            relations as ['moderator' | 'eterapia'],
        );

        return response.json(fieldJournals);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const fieldJournalRepository = new FieldJournalRepository();

        const fieldJournal = await fieldJournalRepository.findById(id);

        return response.json(fieldJournal);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const fieldJournalRepository = new FieldJournalRepository();

        const fieldJournal = await fieldJournalRepository.findById(id);

        if (!fieldJournal) {
            throw new AppError('Field journal not found.');
        }

        await fieldJournalRepository.delete(fieldJournal);

        return response.json(fieldJournal);
    }
}

export default FieldJournalAdministratorController;
