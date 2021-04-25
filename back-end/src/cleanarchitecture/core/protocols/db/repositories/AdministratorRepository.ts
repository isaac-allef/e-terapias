import Administrator from '../../../entities/Administrator';
import CreateAdministratorDTO from '../../../services/administrators/dtos/CreateAdministratorDTO';

export default interface AdministratorRepository {
    create(data: CreateAdministratorDTO): Promise<Administrator>;
    findById(id: string): Promise<Administrator | undefined>;
    findByEmail(email: string): Promise<Administrator | undefined>;
    all(): Promise<Administrator[] | []>;
    save(administrator: Administrator): Promise<void>;
    delete(administrator: Administrator): Promise<void>;
}
