import ISpreadsheetsRepository from '../repositories/ISpreadsheetsRepository';

class ListParticipantsSheetInformationService {
    constructor(private spreadsheetsRepository: ISpreadsheetsRepository) {}

    public async execute(): Promise<unknown[]> {
        const participants = await this.spreadsheetsRepository.getPageRows();

        return participants;
    }
}

export default ListParticipantsSheetInformationService;
