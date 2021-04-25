import Eterapia from '../../../entities/Eterapia';
import CreateEterapiaDTO from '../../../services/eterapias/dtos/CreateEterapiaDTO';
import FindByIdEterapiaDTO from '../../../services/eterapias/dtos/FindByIdEterapiaDTO';
import FindByIdEterapiaFilterByModeratorDTO from '../../../services/eterapias/dtos/FindByIdEterapiaFilterByModeratorDTO';
import FindByNameEterapiaDTO from '../../../services/eterapias/dtos/FindByNameEterapiaDTO';
import ListEterapiasDTO from '../../../services/eterapias/dtos/ListEterapiasDTO';
import ListEterapiasFilterByModeratorDTO from '../../../services/eterapias/dtos/ListEterapiasFilterByModeratorDTO';

export default interface IEterapiaRepository {
    create(data: CreateEterapiaDTO): Promise<Eterapia>;
    createWithoutSave(data: CreateEterapiaDTO): Eterapia;
    findById(data: FindByIdEterapiaDTO): Promise<Eterapia | undefined>;
    findByName(data: FindByNameEterapiaDTO): Promise<Eterapia | undefined>;
    all(data: ListEterapiasDTO): Promise<Eterapia[] | []>;
    save(eterapia: Eterapia): Promise<void>;
    delete(eterapia: Eterapia): Promise<void>;
    allFilterByModerator(
        data: ListEterapiasFilterByModeratorDTO,
    ): Promise<Eterapia[] | []>;
    findByIdFilterByModerator(
        data: FindByIdEterapiaFilterByModeratorDTO,
    ): Promise<Eterapia | undefined>;
}
