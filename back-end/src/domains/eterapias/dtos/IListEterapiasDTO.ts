import IRelationsEterapias from './IRelationsEterapiasDTO';

export default interface IListEterapiasDTO extends IRelationsEterapias {
    orderBy: 'name' | 'created_at' | 'updated_at';
    orderMethod: 'ASC' | 'DESC';
    page: number;
    limit: number;
    search?: string;
}
