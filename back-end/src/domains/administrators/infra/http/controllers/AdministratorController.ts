import { Request, Response } from 'express';
import CreateAdministratorService from '../../../services/CreateAdministratorService';
import UpdateAdministratorService from '../../../services/UpdateAdministratorService';
import DeleteAdministratorService from '../../../services/DeleteAdministratorService';
import AdministratorRepository from '../../typeorm/repositories/AdministratorRepository';
import BCryptHashProvider from '../../../../../shared/providers/HashProvider/implementations/BCryptHashProvider';

class AdministratorController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const administratorRepository = new AdministratorRepository();
        const hashProvider = new BCryptHashProvider();

        const createAdministrator = new CreateAdministratorService(
            administratorRepository,
            hashProvider,
        );

        const administrator = await createAdministrator.execute({
            email,
            password,
        });

        // delete administrator.password;

        return response.json(administrator);
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const administratorRepository = new AdministratorRepository();

        const administrators = await administratorRepository.all();

        return response.json(administrators);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const administratorRepository = new AdministratorRepository();

        const administrators = await administratorRepository.findById(id);

        return response.json(administrators);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { email, password } = request.body;

        const administratorRepository = new AdministratorRepository();

        const updateAdministrator = new UpdateAdministratorService(
            administratorRepository,
        );
        const administrator = await updateAdministrator.execute({
            id,
            email,
            password,
        });

        return response.json(administrator);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const administratorRepository = new AdministratorRepository();

        const deleteAdministrator = new DeleteAdministratorService(
            administratorRepository,
        );

        const administrator = await deleteAdministrator.execute({ id });

        return response.json(administrator);
    }
}

export default AdministratorController;
