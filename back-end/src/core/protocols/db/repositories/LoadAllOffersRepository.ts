import Offer from '../../../entities/Offer';

export type params = {
    sort: 'name' | 'created_at' | 'updated_at';
    direction: 'asc' | 'desc';
    per_page: number;
    page: number;
};

export default interface LoadAllOffersRepository {
    loadAll({ sort, direction, per_page, page }: params): Promise<Offer[]>;
}
