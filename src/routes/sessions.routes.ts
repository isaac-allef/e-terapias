import { Router } from 'express';
import AuthenticateAdministratorService from '../services/AuthenticateAdministratorService';
import AuthenticateModeratorService from '../services/AuthenticateModeratorService';

const sessionsRouter = Router();

sessionsRouter.post('/administrator', async (request, response) => {
    const { email, password } = request.body;

    const authenticateAdministrator = new AuthenticateAdministratorService();

    const { administrator, token } = await authenticateAdministrator.execute({
        email,
        password,
    });

    delete administrator.password;

    return response.json({ administrator, token });
});

sessionsRouter.post('/moderator', async (request, response) => {
    const { email, password } = request.body;

    const authenticateModerator = new AuthenticateModeratorService();

    const { moderator, token } = await authenticateModerator.execute({
        email,
        password,
    });

    delete moderator.password;

    return response.json({ moderator, token });
});

export default sessionsRouter;
