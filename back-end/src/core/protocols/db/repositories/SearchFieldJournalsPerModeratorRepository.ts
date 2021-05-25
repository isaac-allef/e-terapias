import FieldJournal from '../../../entities/FieldJournal';

export type params = {
    moderatorId: string;
    keywords: string;
    per_page: number;
    page: number;
};

export default interface SearchFieldJournalsPerModeratorRepository {
    searchPerModerator({
        moderatorId,
        keywords,
        per_page,
        page,
    }: params): Promise<FieldJournal[]>;
}
