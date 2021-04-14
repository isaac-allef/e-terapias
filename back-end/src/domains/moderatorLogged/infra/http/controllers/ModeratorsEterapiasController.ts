import { Request, Response } from 'express';
import ShowEterapiaFilterByModeratorService from '../../../../eterapias/services/ShowEterapiaFilterByModeratorService';
import EterapiaRepository from '../../../../eterapias/infra/typeorm/repositories/EterapiaRepository';

class ModeratorsEterapiasController {
    public async list(request: Request, response: Response): Promise<Response> {
        const { relations, orderBy, orderMethod, page, limit } = request.query;

        const eterapiaRepository = new EterapiaRepository();

        const eterapias = await eterapiaRepository.allFilterByModerator({
            orderBy: orderBy as 'name' | 'created_at' | 'updated_at',
            orderMethod: orderMethod as 'ASC' | 'DESC',
            page: (page as unknown) as number,
            limit: (limit as unknown) as number,
            relations: relations as [
                'moderators' | 'fieldJournalTemplate' | 'fieldJournals',
            ],
            moderatorId: request.moderator.id,
        });

        return response.json(eterapias);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { relations } = request.query;

        const eterapiaRepository = new EterapiaRepository();
        const findOneEterapia = new ShowEterapiaFilterByModeratorService(
            eterapiaRepository,
        );

        const eterapia = await findOneEterapia.execute({
            id,
            relations: relations as
                | ['moderators' | 'fieldJournalTemplate' | 'fieldJournals']
                | undefined,
            moderatorId: request.moderator.id,
        });

        return response.json(eterapia);
    }
}

export default ModeratorsEterapiasController;
