import { Request, Response } from 'express';
import BCryptHashProvider from '../../../../../shared/providers/HashProvider/implementations/BCryptHashProvider';
import AuthenticateModeratorService from '../../../services/AuthenticateModeratorService';
import ModeratorRepository from '../../typeorm/repositories/ModeratorRepository';

class SessionModeratorController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const moderatorRepository = new ModeratorRepository();
        const hashProvider = new BCryptHashProvider();

        const authenticateModerator = new AuthenticateModeratorService(
            moderatorRepository,
            hashProvider,
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
