export default interface DeleteFieldJournalByIdRepository {
    delete(id: string): Promise<void>;
}
