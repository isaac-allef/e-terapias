import Etherapy from '../../../entities/Etherapy';
import Moderator from '../../../entities/Moderator';

type dto = {
    email: string;
    name: string;
    password: string;
    etherapies: Etherapy[];
};
export type params = dto[];

export default interface CreateModeratorsRepository {
    create(data: params): Promise<Moderator[]>;
}
