import AppError from '../../errors/AppError';
import HashGenerater from '../../protocols/cryptography/HashGenerater';
import Administrator from '../../entities/Administrator';
import AdministratorRepository from '../../protocols/db/repositories/AdministratorRepository';

interface Request {
    email: string;
    password: string;
}

class CreateAdministratorService {
    constructor(
        private administratorRepository: AdministratorRepository,
        private hashGenerater: HashGenerater,
    ) {}

    public async execute({ email, password }: Request): Promise<Administrator> {
        const checkAdministratorExists = await this.administratorRepository.findByEmail(
            email,
        );

        if (checkAdministratorExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await this.hashGenerater.generate(password);

        const administrator = await this.administratorRepository.create({
            email,
            password: hashedPassword,
        });

        return administrator;
    }
}

export default CreateAdministratorService;
