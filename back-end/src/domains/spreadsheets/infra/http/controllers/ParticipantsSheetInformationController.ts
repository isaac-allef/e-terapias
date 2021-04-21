import { Request, Response } from 'express';
import ListParticipantsSheetInformationByEterapiaService from '../../../services/ListParticipantsSheetInformationByEterapiaService';
import ListParticipantsSheetInformationService from '../../../services/ListParticipantsSheetInformationService';
import SpreadsheetsRepository from '../cms-sheets/SpreadsheetsRepository';

class ParticipantsSheetInformationController {
    public async list(
        _request: Request,
        response: Response,
    ): Promise<Response> {
        const spreadsheetsRepository = new SpreadsheetsRepository({
            link: process.env.LINK_SHEET_PARTICIPANTS || '',
            clientEmail: process.env.CLIENT_EMAIL || '',
            privateKey: process.env.PRIVATE_KEY || '',
        });
        const listParticipantsSheetInformation = new ListParticipantsSheetInformationService(
            spreadsheetsRepository,
        );

        const participants = await listParticipantsSheetInformation.execute();

        response.set('X-Total-Count', participants.length.toString());
        return response.json(participants);
    }

    public async listByEterapia(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { eterapiaColumnName } = request.params;

        const spreadsheetsRepository = new SpreadsheetsRepository({
            link: process.env.LINK_SHEET_PARTICIPANTS || '',
            clientEmail: process.env.CLIENT_EMAIL || '',
            privateKey: process.env.PRIVATE_KEY || '',
        });
        const listParticipantsSheetInformationByEterapia = new ListParticipantsSheetInformationByEterapiaService(
            spreadsheetsRepository,
        );

        const participants = await listParticipantsSheetInformationByEterapia.execute(
            eterapiaColumnName,
        );

        response.set('X-Total-Count', participants.length.toString());
        return response.json(participants);
    }
}

export default ParticipantsSheetInformationController;
