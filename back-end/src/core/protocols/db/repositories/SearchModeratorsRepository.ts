import Moderator from '../../../entities/Moderator';

export default interface SearchModeratorsRepository {
    search(keywords: string): Promise<Moderator[]>;
}
