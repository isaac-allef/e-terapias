import AppError from '../../../shared/errors/AppError';
import IAdministrator from '../models/IAdministrator';
import IAdministratorRepository from '../repositories/IAdministratorRepository';

interface Request {
    id: string;
}

class DeleteAdministratorService {
    constructor(private administratorRepository: IAdministratorRepository) {}

    public async execute({ id }: Request): Promise<IAdministrator> {
        const administrator = await this.administratorRepository.findById(id);

        if (!administrator) {
            throw new AppError('Administrator not found.');
        }

        await this.administratorRepository.delete(administrator);

        return administrator;
    }
}

export default DeleteAdministratorService;
