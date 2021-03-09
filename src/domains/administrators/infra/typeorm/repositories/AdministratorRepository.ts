import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateAdministratorDTO from '../../../dtos/ICreateAdministratorDTO';
import IAdministratorRepository from '../../../repositories/IAdministratorRepository';
import Administrator from '../entities/Administrator';

@EntityRepository()
class AdministratorRepository implements IAdministratorRepository {
    private ormRepository: Repository<Administrator>;

    constructor() {
        this.ormRepository = getRepository(Administrator);
    }

    public async create({
        email,
        password,
    }: ICreateAdministratorDTO): Promise<Administrator> {
        const administrator = this.ormRepository.create({
            email,
            password,
        });

        await this.ormRepository.save(administrator);

        return administrator;
    }

    public async findById(id: string): Promise<Administrator | undefined> {
        const administrator = await this.ormRepository.findOne({
            where: { id },
        });

        return administrator;
    }

    public async findByEmail(
        email: string,
    ): Promise<Administrator | undefined> {
        const administrator = await this.ormRepository.findOne({
            where: { email },
        });

        return administrator;
    }

    public async all(): Promise<Administrator[] | []> {
        const administrators = await this.ormRepository.find();
        return administrators;
    }

    public async save(administrator: Administrator): Promise<void> {
        await this.ormRepository.save(administrator);
    }

    public async delete(administrator: Administrator): Promise<void> {
        await this.ormRepository.remove(administrator);
    }
}

export default AdministratorRepository;
