import ICreateEterapiaDTO from '../dtos/ICreateEterapiaDTO';
import IEterapia from '../models/IEterapia';

export default interface IEterapiaRepository {
    create(data: ICreateEterapiaDTO): Promise<IEterapia>;
    findById(id: string): Promise<IEterapia | undefined>;
    findByName(name: string): Promise<IEterapia | undefined>;
    all(
        orderBy: 'name' | 'created_at' | 'updated_at',
        orderMethod: 'ASC' | 'DESC',
        page: number,
        limit: number,
    ): Promise<IEterapia[] | []>;
    save(eterapia: IEterapia): Promise<void>;
    delete(eterapia: IEterapia): Promise<void>;
}
