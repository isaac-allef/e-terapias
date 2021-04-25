export default interface RelationsEterapiasDTO {
    relations?:
        | ['moderators' | 'fieldJournalTemplate' | 'fieldJournals']
        | undefined;
}
