import { Request, Response } from 'express';
import ShowParticipantsSheetInformationByColumnService from '../../../services/ShowParticipantsSheetInformationByEterapiaService';
import ShowParticipantsSheetInformationService from '../../../services/ShowParticipantsSheetInformationService';
import ParticipantsSheetInformationRepository from '../../cms-sheets/ParticipantsSheetInformationRepository';

class ParticipantsSheetInformationController {
    public async show(
        _request: Request,
        response: Response,
    ): Promise<Response> {
        const participantsSheetInformationRepository = new ParticipantsSheetInformationRepository(
            {
                link: process.env.LINK || '',
                clientEmail: process.env.CLIENT_EMAIL || '',
                privateKey: process.env.PRIVATE_KEY || '',
            },
        );
        const showParticipantsSheetInformation = new ShowParticipantsSheetInformationService(
            participantsSheetInformationRepository,
        );

        const sheet = await showParticipantsSheetInformation.execute();

        return response.json(sheet);
    }

    public async showByEterapia(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { eterapiaColumnName } = request.params;

        const participantsSheetInformationRepository = new ParticipantsSheetInformationRepository(
            {
                link: process.env.LINK || '',
                clientEmail: process.env.CLIENT_EMAIL || '',
                privateKey: process.env.PRIVATE_KEY || '',
            },
        );
        const showParticipantsSheetInformation = new ShowParticipantsSheetInformationByColumnService(
            participantsSheetInformationRepository,
        );

        const sheet = await showParticipantsSheetInformation.execute(
            eterapiaColumnName,
        );

        return response.json(sheet);
    }
}

export default ParticipantsSheetInformationController;
