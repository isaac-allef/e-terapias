import { Request, Response } from 'express';
import CreateAdministratorService from '../../services/CreateAdministratorService';
import AdministratorRepository from '../../typeorm/repositories/AdministratorRepository';

class AdministratorController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const administratorRepository = new AdministratorRepository();

        const createAdministrator = new CreateAdministratorService(
            administratorRepository,
        );

        const administrator = await createAdministrator.execute({
            email,
            password,
        });

        // delete administrator.password;

        return response.json(administrator);
    }
}

export default AdministratorController;
