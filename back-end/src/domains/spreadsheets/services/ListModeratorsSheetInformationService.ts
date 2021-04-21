import ISpreadsheetsRepository from '../repositories/ISpreadsheetsRepository';

class ListModeratorsSheetInformationService {
    constructor(private spreadsheetsRepository: ISpreadsheetsRepository) {}

    public async execute(): Promise<unknown[]> {
        const moderators = await this.spreadsheetsRepository.getPageRows();

        return moderators;
    }
}

export default ListModeratorsSheetInformationService;
