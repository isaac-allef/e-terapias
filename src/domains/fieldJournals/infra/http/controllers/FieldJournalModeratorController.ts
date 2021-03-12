import { Request, Response } from 'express';
import CreateFieldJournalService from '../../../services/CreateFieldJournalService';
import FieldJournalRepository from '../../typeorm/repositories/FieldJournalRepository';
import FieldRepository from '../../typeorm/repositories/FieldRepository';
import ModeratorRepository from '../../../../moderators/infra/typeorm/repositories/ModeratorRepository';
import AppError from '../../../../../shared/errors/AppError';
import UpdateFieldsService from '../../../services/UpdateFieldsService';

class FieldJournalModeratorController {
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

        const fieldJournal = await fieldJournalRepository.findById(id);

        if (!fieldJournal) {
            throw new AppError('Field Journal not found.');
        }

        if (request.moderator.id !== fieldJournal.moderator.id) {
            throw new AppError(
                "You cannot change another moderator's field journal",
            );
        }

        fieldJournal.title = title;

        const updateFieldsService = new UpdateFieldsService(fieldJournal);

        updateFieldsService.execute({ updateFields });

        await fieldJournalRepository.save(fieldJournal);

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

        if (request.moderator.id !== fieldJournal.moderator.id) {
            throw new AppError(
                "You cannot delete another moderator's field journal",
            );
        }

        await fieldJournalRepository.delete(fieldJournal);

        return response.json(fieldJournal);
    }
}

export default FieldJournalModeratorController;
