import FieldJournal from '../../../entities/FieldJournal';

export type params = {
    moderatorId: string;
    keywords: string;
};

export default interface SearchFieldJournalsPerModeratorRepository {
    searchPerModerator({
        moderatorId,
        keywords,
    }: params): Promise<FieldJournal[]>;
}
