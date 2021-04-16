import IParticipantsSheetInformationRepository from '../repositories/IParticipantsSheetInformationRepository';

class ShowParticipantsSheetInformationService {
    constructor(
        private participantsSheetInformationRepository: IParticipantsSheetInformationRepository,
    ) {}

    public async execute(): Promise<JSON> {
        const sheet = await this.participantsSheetInformationRepository.getJSON();

        return sheet;
    }
}

export default ShowParticipantsSheetInformationService;
