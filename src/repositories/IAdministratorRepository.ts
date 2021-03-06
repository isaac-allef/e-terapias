import ICreateAdministratorDTO from '../dtos/ICreateAdministratorDTO';
import Administrator from '../typeorm/entities/Administrator';

export default interface IAdministratorRepository {
    create(data: ICreateAdministratorDTO): Promise<Administrator>;
    findByEmail(email: string): Promise<Administrator | undefined>;
}
