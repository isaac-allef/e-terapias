import AppError from '../../errors/AppError';
import Administrator from '../../entities/Administrator';
import AdministratorRepository from '../../protocols/db/repositories/AdministratorRepository';

interface Request {
    id: string;
}

class DeleteAdministratorService {
    constructor(private administratorRepository: AdministratorRepository) {}

    public async execute({ id }: Request): Promise<Administrator> {
        const administrator = await this.administratorRepository.findById(id);

        if (!administrator) {
            throw new AppError('Administrator not found.');
        }

        await this.administratorRepository.delete(administrator);

        return administrator;
    }
}

export default DeleteAdministratorService;
