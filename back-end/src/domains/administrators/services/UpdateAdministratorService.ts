import { hash } from 'bcryptjs';
import AppError from '../../../shared/errors/AppError';
import IAdministrator from '../models/IAdministrator';
import IAdministratorRepository from '../repositories/IAdministratorRepository';

interface Request {
    id: string;
    email: string;
    password: string;
}

class UpdateAdministratorService {
    constructor(private administratorRepository: IAdministratorRepository) {}

    public async execute({
        id,
        email,
        password,
    }: Request): Promise<IAdministrator> {
        const administrator = await this.administratorRepository.findById(id);

        if (!administrator) {
            throw new AppError('Administrator not found.');
        }

        if (email) {
            administrator.email = email;
        }

        if (password) {
            const hashedPassword = await hash(password, 9);
            administrator.password = hashedPassword;
        }

        await this.administratorRepository.save(administrator);

        return administrator;
    }
}

export default UpdateAdministratorService;
