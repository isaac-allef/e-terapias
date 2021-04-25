import RelationsEterapiasDTO from './RelationsEterapiasDTO';

export default interface ListEterapiasDTO extends RelationsEterapiasDTO {
    orderBy: 'name' | 'created_at' | 'updated_at';
    orderMethod: 'ASC' | 'DESC';
    page: number;
    limit: number;
    search: string;
}
