import { Request, Response } from 'express';
import CreateFieldJournalService from '../../../../domains/fieldJournals/services/CreateFieldJournalService';
import FieldJournalRepository from '../../../../domains/fieldJournals/infra/typeorm/repositories/FieldJournalRepository';
import FieldRepository from '../../../../domains/fieldJournals/infra/typeorm/repositories/FieldRepository';
import ModeratorRepository from '../../../../domains/moderators/infra/typeorm/repositories/ModeratorRepository';
import ModeratorDeleteFieldJournalService from '../../../../domains/fieldJournals/services/ModeratorDeleteFieldJournalService';
import ModeratorShowFieldJournalService from '../../../../domains/fieldJournals/services/ModeratorShowFieldJournalService';
import UpdateFieldJournalService from '../../../../domains/fieldJournals/services/UpdateFieldJournalService';

class ModeratorsFieldJournalsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.moderator;
        const { title, fields, eterapiaId } = request.body;

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
            moderatorId: id,
        });

        return response.json(fieldJournal);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { title, updateFields } = request.body;

        const fieldJournalRepository = new FieldJournalRepository();

        const updateFieldJournal = new UpdateFieldJournalService(
            fieldJournalRepository,
        );

        const fieldJournal = await updateFieldJournal.execute({
            id,
            moderatorId: request.moderator.id,
            title,
            updateFields,
        });

        return response.json(fieldJournal);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const fieldJournalRepository = new FieldJournalRepository();

        const moderatorDeleteFieldJournal = new ModeratorDeleteFieldJournalService(
            fieldJournalRepository,
        );

        const fieldJournal = await moderatorDeleteFieldJournal.execute({
            id,
            moderatorId: request.moderator.id,
        });

        return response.json(fieldJournal);
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const { relations, orderBy, orderMethod, page, limit } = request.query;

        const fieldJournalRepository = new FieldJournalRepository();

        const fieldJournals = await fieldJournalRepository.allFilterByModerator(
            {
                orderBy: orderBy as 'title' | 'created_at' | 'updated_at',
                orderMethod: orderMethod as 'ASC' | 'DESC',
                page: (page as unknown) as number,
                limit: (limit as unknown) as number,
                relations: relations as ['moderator' | 'eterapia'],
                moderatorId: request.moderator.id,
            },
        );

        return response.json(fieldJournals);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { relations } = request.query;

        const fieldJournalRepository = new FieldJournalRepository();

        const moderatorShowFieldJournalService = new ModeratorShowFieldJournalService(
            fieldJournalRepository,
        );

        const fieldJournal = await moderatorShowFieldJournalService.execute({
            id,
            relations: relations as ['moderator' | 'eterapia'],
            moderatorId: request.moderator.id,
        });

        return response.json(fieldJournal);
    }
}

export default ModeratorsFieldJournalsController;
