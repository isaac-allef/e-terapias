import { Request, Response } from 'express';
import ShowModeratorService from '../../../services/ShowModeratorService';
import ModeratorRepository from '../../typeorm/repositories/ModeratorRepository';

class MeController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { relations } = request.query;

        const moderatorRepository = new ModeratorRepository();

        const showModerator = new ShowModeratorService(moderatorRepository);

        const moderator = await showModerator.execute({
            id: request.moderator.id,
            relations: relations as [
                | 'eterapias'
                | 'eterapias.fieldJournalTemplate'
                | 'fieldJournals',
            ],
        });

        return response.json(moderator);
    }
}

export default MeController;
