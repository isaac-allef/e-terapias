import ICreateEterapiaDTO from '../dtos/ICreateEterapiaDTO';
import IFindByIdEterapiaDTO from '../dtos/IFindByIdEterapiaDTO';
import IFindByIdEterapiaFilterByModeratorDTO from '../dtos/IFindByIdEterapiaFilterByModeratorDTO';
import IFindByNameEterapiaDTO from '../dtos/IFindByNameEterapiaDTO';
import IListEterapiasDTO from '../dtos/IListEterapiasDTO';
import IListEterapiasFilterByModeratorDTO from '../dtos/IListEterapiasFilterByModeratorDTO';
import IEterapia from '../models/IEterapia';

export default interface IEterapiaRepository {
    create(data: ICreateEterapiaDTO): Promise<IEterapia>;
    createWithoutSave(data: ICreateEterapiaDTO): IEterapia;
    findById(data: IFindByIdEterapiaDTO): Promise<IEterapia | undefined>;
    findByName(data: IFindByNameEterapiaDTO): Promise<IEterapia | undefined>;
    all(data: IListEterapiasDTO): Promise<IEterapia[] | []>;
    save(eterapia: IEterapia): Promise<void>;
    delete(eterapia: IEterapia): Promise<void>;
    allFilterByModerator(
        data: IListEterapiasFilterByModeratorDTO,
    ): Promise<IEterapia[] | []>;
    findByIdFilterByModerator(
        data: IFindByIdEterapiaFilterByModeratorDTO,
    ): Promise<IEterapia | undefined>;
}
