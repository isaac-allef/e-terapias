import AppError from '../../../shared/errors/AppError';
import ISpreadsheetsRepository from '../repositories/ISpreadsheetsRepository';

class ListParticipantsSheetInformationByEterapiaService {
    constructor(private spreadsheetsRepository: ISpreadsheetsRepository) {}

    public async execute(eterapiaColumnName: string): Promise<unknown[]> {
        const verify = (value: string) => {
            if (value === '' || !value) {
                return false;
            }
            return true;
        };

        const like = (column: string, value: string) => {
            if (column.includes(value)) {
                return true;
            }
            return false;
        };

        const participants = await this.spreadsheetsRepository.getPageRowsByColumn(
            eterapiaColumnName,
            like,
            verify,
        );

        if (!participants) {
            throw new AppError('Column name not found.');
        }

        return participants;
    }
}

export default ListParticipantsSheetInformationByEterapiaService;
