import Etherapy from '../../../entities/Etherapy';

export type params = {
    sort: 'name' | 'created_at' | 'updated_at';
    direction: 'asc' | 'desc';
    per_page: number;
    page: number;
};

export default interface LoadAllEtherapiesRepository {
    loadAll({ sort, direction, per_page, page }: params): Promise<Etherapy[]>;
}
