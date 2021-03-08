import { Request, Response } from 'express';
import AuthenticateAdministratorService from '../../../services/AuthenticateAdministratorService';
import AdministratorRepository from '../../typeorm/repositories/AdministratorRepository';

class SessionAdministratorController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const administratorRepository = new AdministratorRepository();

        const authenticateAdministrator = new AuthenticateAdministratorService(
            administratorRepository,
        );

        const {
            administrator,
            token,
        } = await authenticateAdministrator.execute({
            email,
            password,
        });

        // delete administrator.password;

        return response.json({ administrator, token });
    }
}

export default SessionAdministratorController;
