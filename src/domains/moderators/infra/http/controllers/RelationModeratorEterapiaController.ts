import { Request, Response } from 'express';
import AppError from '../../../../../shared/errors/AppError';
import EterapiaRepository from '../../../../eterapias/infra/typeorm/repositories/EterapiaRepository';
import ModeratorRepository from '../../typeorm/repositories/ModeratorRepository';

class RelationModeratorEterapiaController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { moderatorId, eterapiaId } = request.body;

        const moderatorRepository = new ModeratorRepository();

        const moderator = await moderatorRepository.findById(moderatorId);

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

        return response.json();
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { moderatorId, eterapiaId } = request.body;

        const moderatorRepository = new ModeratorRepository();

        const moderator = await moderatorRepository.findById(moderatorId);

        if (!moderator) {
            throw new AppError('Moderator not found.');
        }

        const eterapiaRepository = new EterapiaRepository();

        const eterapia = await eterapiaRepository.findById(eterapiaId);

        if (!eterapia) {
            throw new AppError('Eterapia not found.');
        }

        const newEterapiasArray = moderator.eterapias.filter(ete => {
            return ete.id !== eterapia.id;
        });

        moderator.eterapias = newEterapiasArray;

        moderatorRepository.save(moderator);

        return response.json();
    }
}

export default RelationModeratorEterapiaController;
