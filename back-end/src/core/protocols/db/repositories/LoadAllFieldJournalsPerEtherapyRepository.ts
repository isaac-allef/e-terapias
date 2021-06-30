import FieldJournal from '../../../entities/FieldJournal';

export type params = {
    offerId?: string;
    etherapyId: string;
    sort: 'name' | 'date' | 'created_at' | 'updated_at';
    direction: 'asc' | 'desc';
    per_page: number;
    page: number;
};

export default interface LoadAllFieldJournalsPerEtherapyRepository {
    loadAllPerEtherapy({
        etherapyId,
        sort,
        direction,
        per_page,
        page,
    }: params): Promise<FieldJournal[]>;
}
