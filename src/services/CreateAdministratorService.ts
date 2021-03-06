import { hash } from 'bcryptjs';
import Administrator from '../typeorm/entities/Administrator';
import AppError from '../errors/AppError';
import AdministratorRepository from '../typeorm/repositories/AdministratorRepository';

interface Request {
    email: string;
    password: string;
}

class CreateAdministratorService {
    constructor(private administratorRepository: AdministratorRepository) {}

    public async execute({ email, password }: Request): Promise<Administrator> {
        const checkAdministratorExists = await this.administratorRepository.findByEmail(
            email,
        );

        if (checkAdministratorExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await hash(password, 9);

        const administrator = await this.administratorRepository.create({
            email,
            password: hashedPassword,
        });

        return administrator;
    }
}

export default CreateAdministratorService;
