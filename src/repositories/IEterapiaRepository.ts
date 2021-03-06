import ICreateEterapiaDTO from '../dtos/ICreateEterapiaDTO';
import Eterapia from '../typeorm/entities/Eterapia';

export default interface IEterapiaRepository {
    create(data: ICreateEterapiaDTO): Promise<Eterapia>;
    findById(id: string): Promise<Eterapia | undefined>;
    findByName(name: string): Promise<Eterapia | undefined>;
    all(): Promise<Eterapia[] | []>;
    save(eterapia: Eterapia): Promise<void>;
}
