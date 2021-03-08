import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateEterapiaDTO from '../../../dtos/ICreateEterapiaDTO';
import IEterapiaRepository from '../../../repositories/IEterapiaRepository';
import Eterapia from '../../../../../typeorm/entities/Eterapia';

@EntityRepository()
class EterapiaRepository implements IEterapiaRepository {
    private ormRepository: Repository<Eterapia>;

    constructor() {
        this.ormRepository = getRepository(Eterapia);
    }

    public async create({ name }: ICreateEterapiaDTO): Promise<Eterapia> {
        const eterapia = this.ormRepository.create({ name });

        await this.ormRepository.save(eterapia);

        return eterapia;
    }

    public async findById(id: string): Promise<Eterapia | undefined> {
        const eterapia = await this.ormRepository.findOne({
            where: { id },
        });

        return eterapia;
    }

    public async findByName(name: string): Promise<Eterapia | undefined> {
        const eterapia = await this.ormRepository.findOne({
            where: { name },
        });

        return eterapia;
    }

    public async all(): Promise<Eterapia[] | []> {
        const eterapias = await this.ormRepository.find();

        return eterapias;
    }

    public async save(eterapia: Eterapia): Promise<void> {
        await this.ormRepository.save(eterapia);
    }
}

export default EterapiaRepository;
