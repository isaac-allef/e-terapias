import FieldJournal from '../../../entities/FieldJournal';

export type params = {
    offerId?: string;
    moderatorId: string;
    sort: 'name' | 'date' | 'created_at' | 'updated_at';
    direction: 'asc' | 'desc';
    per_page: number;
    page: number;
};

export default interface LoadAllFieldJournalsPerModeratorRepository {
    loadAllPerModerator({
        moderatorId,
        sort,
        direction,
        per_page,
        page,
    }: params): Promise<FieldJournal[]>;
}
