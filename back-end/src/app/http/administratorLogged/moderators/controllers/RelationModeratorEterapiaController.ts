import { Request, Response } from 'express';
import EterapiaRepository from '../../../../../domains/eterapias/infra/typeorm/repositories/EterapiaRepository';
import CreateRelationBetweenModeratorAndEterapiaService from '../../../../../domains/moderators/services/CreateRelationBetweenModeratorAndEterapiaService';
import DeleteRelationBetweenModeratorAndEterapiaService from '../../../../../domains/moderators/services/DeleteRelationBetweenModeratorAndEterapiaService';
import ModeratorRepository from '../../../../../domains/moderators/infra/typeorm/repositories/ModeratorRepository';

class RelationModeratorEterapiaController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { moderatorId, eterapiaId } = request.body;

        const moderatorRepository = new ModeratorRepository();
        const eterapiaRepository = new EterapiaRepository();

        const createRelationBetweenModeratorAndEterapiaService = new CreateRelationBetweenModeratorAndEterapiaService(
            moderatorRepository,
            eterapiaRepository,
        );
        const moderator = await createRelationBetweenModeratorAndEterapiaService.execute(
            {
                moderatorId,
                eterapiaId,
            },
        );

        return response.json({ moderator });
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { moderatorId, eterapiaId } = request.body;

        const moderatorRepository = new ModeratorRepository();

        const deleteRelationBetweenModeratorAndEterapiaService = new DeleteRelationBetweenModeratorAndEterapiaService(
            moderatorRepository,
        );
        const moderator = await deleteRelationBetweenModeratorAndEterapiaService.execute(
            { eterapiaId, moderatorId },
        );

        return response.json({ moderator });
    }
}

export default RelationModeratorEterapiaController;
