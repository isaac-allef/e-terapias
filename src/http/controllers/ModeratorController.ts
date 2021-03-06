import { Request, Response } from 'express';
import AppError from '../../errors/AppError';
import CreateModeratorService from '../../services/CreateModeratorService';
import EterapiaRepository from '../../typeorm/repositories/EterapiaRepository';
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

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const { eterapiaId } = request.body;

        const moderatorRepository = new ModeratorRepository();
        const moderator = await moderatorRepository.findById(id);

        if (!moderator) {
            throw new AppError('Moderator not found.');
        }

        const eterapiaRepository = new EterapiaRepository();
        const eterapia = await eterapiaRepository.findById(eterapiaId);

        if (!eterapia) {
            throw new AppError('Eterapia not found.');
        }

        moderator.eterapias.push(eterapia);

        moderatorRepository.save(moderator);

        return response.json(moderator);
    }
}

export default ModeratorController;
