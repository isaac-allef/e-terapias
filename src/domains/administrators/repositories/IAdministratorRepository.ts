import ICreateAdministratorDTO from '../dtos/ICreateAdministratorDTO';
import IAdministrator from '../models/IAdministrator';

export default interface IAdministratorRepository {
    create(data: ICreateAdministratorDTO): Promise<IAdministrator>;
    findByEmail(email: string): Promise<IAdministrator | undefined>;
}
