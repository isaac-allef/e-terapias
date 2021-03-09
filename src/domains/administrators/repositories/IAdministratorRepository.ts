import ICreateAdministratorDTO from '../dtos/ICreateAdministratorDTO';
import IAdministrator from '../models/IAdministrator';

export default interface IAdministratorRepository {
    create(data: ICreateAdministratorDTO): Promise<IAdministrator>;
    findById(id: string): Promise<IAdministrator | undefined>;
    findByEmail(email: string): Promise<IAdministrator | undefined>;
    all(): Promise<IAdministrator[] | []>;
    save(administrator: IAdministrator): Promise<void>;
    delete(administrator: IAdministrator): Promise<void>;
}
