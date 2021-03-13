import { Request, Response } from 'express';
import AppError from '../../../../../shared/errors/AppError';
import CreateAdministratorService from '../../../services/CreateAdministratorService';
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

        const administrator = await administratorRepository.findById(id);

        if (!administrator) {
            throw new AppError('Administrator not found.');
        }

        administrator.email = email;
        administrator.password = password;

        await administratorRepository.save(administrator);

        return response.json(administrator);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const administratorRepository = new AdministratorRepository();

        const administrator = await administratorRepository.findById(id);

        if (!administrator) {
            throw new AppError('Administrator not found.');
        }

        await administratorRepository.delete(administrator);

        return response.json(administrator);
    }
}

export default AdministratorController;
