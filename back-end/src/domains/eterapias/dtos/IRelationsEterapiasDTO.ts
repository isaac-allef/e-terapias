export default interface IRelationsEterapiasDTO {
    relations?:
        | ['moderators' | 'fieldJournalTemplate' | 'fieldJournals']
        | undefined;
}
