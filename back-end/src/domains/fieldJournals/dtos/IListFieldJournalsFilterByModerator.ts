import IListFieldJournals from './IListFieldJournals';

export default interface IListFieldJournalsFilterByModerator
    extends IListFieldJournals {
    moderatorId?: string;
}
