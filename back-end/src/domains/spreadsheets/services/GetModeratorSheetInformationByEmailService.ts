import AppError from '../../../shared/errors/AppError';
import ISpreadsheetsRepository from '../repositories/ISpreadsheetsRepository';

class GetModeratorSheetInformationByEmailService {
    constructor(private spreadsheetsRepository: ISpreadsheetsRepository) {}

    public async execute(email: string): Promise<unknown[]> {
        const verifyColumnValue = (value: string) => {
            if (value === email) {
                return true;
            }
            return false;
        };

        const verifyColumnName = (column: string, value: string) => {
            if (column === value) {
                return true;
            }
            return false;
        };

        const moderator = await this.spreadsheetsRepository.getPageRowsByColumn(
            'Endereço de e-mail',
            verifyColumnName,
            verifyColumnValue,
        );

        if (!moderator) {
            throw new AppError('Moderator not found.');
        }

        return moderator;
    }
}

export default GetModeratorSheetInformationByEmailService;
