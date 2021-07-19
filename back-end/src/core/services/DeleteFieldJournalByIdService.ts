import DeleteFieldJournalByIdRepository from '../protocols/db/repositories/DeleteFieldJournalByIdRepository';

class DeleteFieldJournalByIdService {
    constructor(
        private deleteFieldJournalByIdRepository: DeleteFieldJournalByIdRepository,
    ) {}

    public async execute(id: string): Promise<string> {
        await this.deleteFieldJournalByIdRepository.delete(id);

        return 'FieldJournal deleted';
    }
}

export default DeleteFieldJournalByIdService;
