import Moderator from '../../../entities/Moderator';

export type params = {
    keywords: string;
    per_page: number;
    page: number;
};

export default interface SearchModeratorsRepository {
    search({ keywords, per_page, page }: params): Promise<Moderator[]>;
}
