import Moderator from '../../../entities/Moderator';

export type params = {
    email: string;
    name: string;
};

export default interface CreateModeratorRepository {
    create({ email, name }: params): Promise<Moderator>;
}
