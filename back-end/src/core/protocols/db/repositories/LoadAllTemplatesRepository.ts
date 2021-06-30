import Template from '../../../entities/Template';

export type params = {
    offerId?: string;
    sort: 'name' | 'created_at' | 'updated_at';
    direction: 'asc' | 'desc';
    per_page: number;
    page: number;
};

export default interface LoadAllTemplatesRepository {
    loadAll({ sort, direction, per_page, page }: params): Promise<Template[]>;
}
