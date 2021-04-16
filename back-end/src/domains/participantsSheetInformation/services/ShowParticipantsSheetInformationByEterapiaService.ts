import AppError from '../../../shared/errors/AppError';
import IParticipantsSheetInformationRepository from '../repositories/IParticipantsSheetInformationRepository';

class ShowParticipantsSheetInformationByColumnService {
    constructor(
        private participantsSheetInformationRepository: IParticipantsSheetInformationRepository,
    ) {}

    public async execute(eterapiaColumnName: string): Promise<JSON> {
        const verify = (value: string) => {
            if (value === '') {
                return false;
            }
            return true;
        };

        const sheet = await this.participantsSheetInformationRepository.getByColumnJSON(
            eterapiaColumnName,
            verify,
        );

        if (!sheet) {
            throw new AppError('Column name undefined');
        }

        return sheet;
    }
}

export default ShowParticipantsSheetInformationByColumnService;
