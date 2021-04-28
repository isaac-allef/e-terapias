import Moderator from '../../../entities/Moderator';

export type params = {
    email: string;
    name: string;
    password: string;
};

export default interface CreateModeratorRepository {
    create({ email, name, password }: params): Promise<Moderator>;
}
