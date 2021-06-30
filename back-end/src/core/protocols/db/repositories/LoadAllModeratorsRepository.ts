import Moderator from '../../../entities/Moderator';

export type params = {
    offerId?: string;
    sort: 'name' | 'created_at' | 'updated_at';
    direction: 'asc' | 'desc';
    per_page: number;
    page: number;
};

export default interface LoadAllModeratorsRepository {
    loadAll({ sort, direction, per_page, page }: params): Promise<Moderator[]>;
}
