import { Request, Response } from 'express';
import AppError from '../../../../../shared/errors/AppError';
import CreateModeratorService from '../../../services/CreateModeratorService';
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
        const { search, orderBy, orderMethod, page, limit } = request.query;

        const moderators = await moderatorRepository.all(
            orderBy as 'email' | 'created_at' | 'updated_at',
            orderMethod as 'ASC' | 'DESC',
            (page as unknown) as number,
            (limit as unknown) as number,
            search as string,
        );

        return response.json(moderators);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const moderatorRepository = new ModeratorRepository();

        const moderators = await moderatorRepository.findById(id);

        return response.json(moderators);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const { email, password } = request.body;

        const moderatorRepository = new ModeratorRepository();
        const moderator = await moderatorRepository.findById(id);

        if (!moderator) {
            throw new AppError('Moderator not found.');
        }

        moderator.email = email;
        moderator.password = password;

        moderatorRepository.save(moderator);

        return response.json(moderator);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const moderatorRepository = new ModeratorRepository();

        const moderator = await moderatorRepository.findById(id);

        if (!moderator) {
            throw new AppError('Moderator not found.');
        }

        await moderatorRepository.delete(moderator);

        return response.json(moderator);
    }
}

export default ModeratorController;
