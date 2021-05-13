import Manager from '../../../entities/Manager';

type dto = {
    name: string;
    email: string;
    password: string;
};

export type params = dto[];

export default interface UploadManagersListRepository {
    upload(data: params): Promise<Manager[]>;
}
