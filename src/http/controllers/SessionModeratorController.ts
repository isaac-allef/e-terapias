import { Request, Response } from 'express';
import AuthenticateModeratorService from '../../services/AuthenticateModeratorService';
import ModeratorRepository from '../../typeorm/repositories/ModeratorRepository';

class SessionModeratorController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const moderatorRepository = new ModeratorRepository();

        const authenticateModerator = new AuthenticateModeratorService(
            moderatorRepository,
        );

        const { moderator, token } = await authenticateModerator.execute({
            email,
            password,
        });

        // delete moderator.password;

        return response.json({ moderator, token });
    }
}

export default SessionModeratorController;
