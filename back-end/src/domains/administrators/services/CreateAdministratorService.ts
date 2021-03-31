import AppError from '../../../shared/errors/AppError';
import IHashProvider from '../../../shared/providers/HashProvider/models/IHashProvider';
import IAdministrator from '../models/IAdministrator';
import IAdministratorRepository from '../repositories/IAdministratorRepository';

interface Request {
    email: string;
    password: string;
}

class CreateAdministratorService {
    constructor(
        private administratorRepository: IAdministratorRepository,
        private hashProvider: IHashProvider,
    ) {}

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

        const hashedPassword = await this.hashProvider.generateHash(password);

        const administrator = await this.administratorRepository.create({
            email,
            password: hashedPassword,
        });

        return administrator;
    }
}

export default CreateAdministratorService;
