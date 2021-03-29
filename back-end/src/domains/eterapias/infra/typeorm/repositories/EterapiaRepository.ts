import { EntityRepository, getRepository, ILike, Repository } from 'typeorm';
import ICreateEterapiaDTO from '../../../dtos/ICreateEterapiaDTO';
import IFindByIdEterapiaDTO from '../../../dtos/IFindByIdEterapiaDTO';
import IFindByNameEterapiaDTO from '../../../dtos/IFindByNameEterapiaDTO';
import IListEterapiasDTO from '../../../dtos/IListEterapiasDTO';
import IEterapiaRepository from '../../../repositories/IEterapiaRepository';
import Eterapia from '../entities/Eterapia';

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

    public createWithoutSave({ name }: ICreateEterapiaDTO): Eterapia {
        const eterapia = this.ormRepository.create({ name });

        return eterapia;
    }

    public async findById({
        id,
        relations,
    }: IFindByIdEterapiaDTO): Promise<Eterapia | undefined> {
        const eterapia = await this.ormRepository.findOne({
            where: { id },
            relations,
        });

        return eterapia;
    }

    public async findByName({
        name,
        relations,
    }: IFindByNameEterapiaDTO): Promise<Eterapia | undefined> {
        const eterapia = await this.ormRepository.findOne({
            where: { name },
            relations,
        });

        return eterapia;
    }

    public async all({
        orderBy,
        orderMethod,
        page = 1,
        limit = 5,
        search = '',
        relations,
    }: IListEterapiasDTO): Promise<Eterapia[] | []> {
        const orderObject = this.createOrderObject(orderBy, orderMethod);

        const eterapias = await this.ormRepository.find({
            order: orderObject,
            take: limit,
            skip: (page - 1) * limit,
            where: [{ name: ILike(`%${search}%`) }],
            relations,
        });

        return eterapias;
    }

    private createOrderObject(
        orderBy: 'name' | 'created_at' | 'updated_at',
        orderMethod: 'ASC' | 'DESC',
    ) {
        if (orderBy === 'name') {
            return { name: orderMethod };
        }
        if (orderBy === 'created_at') {
            return { created_at: orderMethod };
        }
        if (orderBy === 'updated_at') {
            return { created_at: orderMethod };
        }
        return undefined;
    }

    public async save(eterapia: Eterapia): Promise<void> {
        await this.ormRepository.save(eterapia);
    }

    public async delete(eterapia: Eterapia): Promise<void> {
        await this.ormRepository.remove(eterapia);
    }
}

export default EterapiaRepository;
