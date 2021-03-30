import { Request, Response } from 'express';
import AppError from '../../../../../shared/errors/AppError';
import CreateModeratorService from '../../../services/CreateModeratorService';
import DeleteModeratorService from '../../../services/DeleteModeratorService';
import UpdateModeratorService from '../../../services/UpdateModeratorService';
import ModeratorRepository from '../../typeorm/repositories/ModeratorRepository';

class ModeratorController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const moderatorRepository = new ModeratorRepository();

        const createModerator = new CreateModeratorService(moderatorRepository);

        const administrator = await createModerator.execute({
            email,
            password,
        });

        // delete administrator.password;

        return response.json(administrator);
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const moderatorRepository = new ModeratorRepository();
        const {
            search,
            relations,
            orderBy,
            orderMethod,
            page,
            limit,
        } = request.query;

        const moderators = await moderatorRepository.all(
            orderBy as 'email' | 'created_at' | 'updated_at',
            orderMethod as 'ASC' | 'DESC',
            (page as unknown) as number,
            (limit as unknown) as number,
            search as string,
            relations as [
                | 'eterapias'
                | 'eterapias.fieldJournalTemplate'
                | 'fieldJournals',
            ],
        );

        return response.json(moderators);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { relations } = request.query;

        const moderatorRepository = new ModeratorRepository();

        const moderator = await moderatorRepository.findById(
            id,
            relations as [
                | 'eterapias'
                | 'eterapias.fieldJournalTemplate'
                | 'fieldJournals',
            ],
        );

        if (!moderator) {
            throw new AppError('Moderator not found.');
        }

        return response.json(moderator);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const { email, password } = request.body;

        const moderatorRepository = new ModeratorRepository();
        const updateModerator = new UpdateModeratorService(moderatorRepository);
        const moderator = await updateModerator.execute({
            id,
            email,
            password,
        });

        return response.json(moderator);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const moderatorRepository = new ModeratorRepository();

        const deleteModerator = new DeleteModeratorService(moderatorRepository);

        const moderator = await deleteModerator.execute({ id });

        return response.json(moderator);
    }
}

export default ModeratorController;
