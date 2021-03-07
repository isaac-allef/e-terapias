import ICreateEterapiaDTO from '../dtos/ICreateEterapiaDTO';
import IEterapia from '../models/IEterapia';

export default interface IEterapiaRepository {
    create(data: ICreateEterapiaDTO): Promise<IEterapia>;
    findById(id: string): Promise<IEterapia | undefined>;
    findByName(name: string): Promise<IEterapia | undefined>;
    all(): Promise<IEterapia[] | []>;
    save(eterapia: IEterapia): Promise<void>;
}
