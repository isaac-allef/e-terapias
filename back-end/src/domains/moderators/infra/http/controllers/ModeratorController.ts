import { Request, Response } from 'express';
import BCryptHashProvider from '../../../../../shared/providers/HashProvider/implementations/BCryptHashProvider';
import CreateModeratorService from '../../../services/CreateModeratorService';
import DeleteModeratorService from '../../../services/DeleteModeratorService';
import ShowModeratorService from '../../../services/ShowModeratorService';
import UpdateModeratorService from '../../../services/UpdateModeratorService';
import ModeratorRepository from '../../typeorm/repositories/ModeratorRepository';

class ModeratorController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const moderatorRepository = new ModeratorRepository();
        const hashProvider = new BCryptHashProvider();

        const createModerator = new CreateModeratorService(
            moderatorRepository,
            hashProvider,
        );

        const administrator = await createModerator.execute({
            email,
            password,
        });

        // delete administrator.password;

        return response.json(administrator);
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const moderatorRepository = new ModeratorRepository();
        const { relations, orderBy, orderMethod, page, limit } = request.query;

        const moderators = await moderatorRepository.all({
            orderBy: orderBy as 'email' | 'created_at' | 'updated_at',
            orderMethod: orderMethod as 'ASC' | 'DESC',
            page: (page as unknown) as number,
            limit: (limit as unknown) as number,
            relations: relations as [
                | 'eterapias'
                | 'eterapias.fieldJournalTemplate'
                | 'fieldJournals',
            ],
        });

        return response.json(moderators);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { relations } = request.query;

        const moderatorRepository = new ModeratorRepository();

        const showModerator = new ShowModeratorService(moderatorRepository);

        const moderator = await showModerator.execute({
            id,
            relations: relations as [
                | 'eterapias'
                | 'eterapias.fieldJournalTemplate'
                | 'fieldJournals',
            ],
        });

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
