/* eslint-disable no-restricted-syntax */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import ManagerTypeorm from '../entities/ManagerTypeorm';
import UploadManagersListRepository, {
    params,
} from '../../../../core/protocols/db/repositories/UploadManagersListRepository';
import Manager from '../../../../core/entities/Manager';

@EntityRepository()
class ManagerTypeormRepository implements UploadManagersListRepository {
    private ormRepository: Repository<ManagerTypeorm>;

    constructor() {
        this.ormRepository = getRepository(ManagerTypeorm);
    }

    async upload(data: params): Promise<Manager[]> {
        try {
            const managers = [];

            for (const dto of data) {
                // eslint-disable-next-line no-await-in-loop
                const managerExists = await this.ormRepository.findOne({
                    email: dto.email,
                });

                if (managerExists) {
                    managerExists.name = dto.name;
                    managers.push(managerExists);
                } else {
                    const manager = this.ormRepository.create({
                        name: dto.name,
                        email: dto.email,
                        password: dto.password,
                    });
                    managers.push(manager);
                }
            }

            await this.ormRepository.save(managers);

            return managers;
        } catch {
            throw new Error('Create managers error');
        }
    }
}

export default ManagerTypeormRepository;
