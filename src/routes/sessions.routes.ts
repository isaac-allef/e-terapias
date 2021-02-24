import { Router } from 'express';
import AuthenticateAdministratorService from '../services/AuthenticateAdministratorService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const authenticateAdministrator = new AuthenticateAdministratorService();

    const { administrator, token } = await authenticateAdministrator.execute({
        email,
        password,
    });

    delete administrator.password;

    return response.json({ administrator, token });
});

export default sessionsRouter;
