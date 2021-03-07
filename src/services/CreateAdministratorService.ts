import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';
import IAdministrator from '../models/IAdministrator';
import IAdministratorRepository from '../repositories/IAdministratorRepository';

interface Request {
    email: string;
    password: string;
}

class CreateAdministratorService {
    constructor(private administratorRepository: IAdministratorRepository) {}

    public async execute({
        email,
        password,
    }: Request): Promise<IAdministrator> {
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
