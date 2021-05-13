import Manager from '../entities/Manager';
import HashGenerater from '../protocols/cryptography/HashGenerater';
import UploadManagersListRepository from '../protocols/db/repositories/UploadManagersListRepository';

type dto = {
    email: string;
    name: string;
    password: string;
};

export type params = dto[];

class UploadManagersListService {
    constructor(
        private hashGenerater: HashGenerater,
        private uploadManagersListRepository: UploadManagersListRepository,
    ) {}

    public async execute(data: params): Promise<Manager[]> {
        const managersParams = await Promise.all(
            data.map(async (d: dto) => {
                const managerParam = {
                    email: d.email,
                    name: d.name,
                    password: await await this.hashGenerater.generate(
                        d.password,
                    ),
                };

                return managerParam;
            }),
        );

        const managers = await this.uploadManagersListRepository.upload(
            managersParams,
        );

        return managers;
    }
}

export default UploadManagersListService;
