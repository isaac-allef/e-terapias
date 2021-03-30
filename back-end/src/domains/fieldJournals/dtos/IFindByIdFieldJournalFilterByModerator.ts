import IFindByIdFieldJournal from './IFindByIdFieldJournal';

export default interface IFindByIdFieldJournalFilterByModerator
    extends IFindByIdFieldJournal {
    moderatorId: string;
}
