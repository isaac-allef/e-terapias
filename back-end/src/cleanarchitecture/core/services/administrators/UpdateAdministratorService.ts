import AppError from '../../errors/AppError';
import HashGenerater from '../../protocols/cryptography/HashGenerater';
import Administrator from '../../entities/Administrator';
import AdministratorRepository from '../../protocols/db/repositories/AdministratorRepository';

interface Request {
    id: string;
    email: string;
    password: string;
}

class UpdateAdministratorService {
    constructor(
        private administratorRepository: AdministratorRepository,
        private hashGenerater: HashGenerater,
    ) {}

    public async execute({
        id,
        email,
        password,
    }: Request): Promise<Administrator> {
        const administrator = await this.administratorRepository.findById(id);

        if (!administrator) {
            throw new AppError('Administrator not found.');
        }

        if (email) {
            administrator.email = email;
        }

        if (password) {
            const hashedPassword = await this.hashGenerater.generate(password);
            administrator.password = hashedPassword;
        }

        await this.administratorRepository.save(administrator);

        return administrator;
    }
}

export default UpdateAdministratorService;
