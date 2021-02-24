import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Administrator from '../entities/Administrator';
import AppError from '../errors/AppError';

interface Request {
    email: string;
    password: string;
}

class CreateAdministratorService {
    public async execute({ email, password }: Request): Promise<Administrator> {
        const administratorRepository = getRepository(Administrator);

        const checkAdministratorExists = await administratorRepository.findOne({
            where: { email },
        });

        if (checkAdministratorExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await hash(password, 9);

        const administrator = administratorRepository.create({
            email,
            password: hashedPassword,
        });

        await administratorRepository.save(administrator);

        return administrator;
    }
}

export default CreateAdministratorService;
