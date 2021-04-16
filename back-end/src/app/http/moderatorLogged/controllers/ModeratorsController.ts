import { Request, Response } from 'express';
import ShowModeratorService from '../../../../domains/moderators/services/ShowModeratorService';
import ModeratorRepository from '../../../../domains/moderators/infra/typeorm/repositories/ModeratorRepository';

class ModeratorsController {
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

export default ModeratorsController;
