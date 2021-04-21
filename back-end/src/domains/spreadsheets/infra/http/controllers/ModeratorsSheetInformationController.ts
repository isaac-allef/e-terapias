import { Request, Response } from 'express';
import ListModeratorsSheetInformationService from '../../../services/ListModeratorsSheetInformationService';
import SpreadsheetsRepository from '../cms-sheets/SpreadsheetsRepository';

class ModeratorsSheetInformationController {
    public async list(
        _request: Request,
        response: Response,
    ): Promise<Response> {
        const spreadsheetsRepository = new SpreadsheetsRepository({
            link: process.env.LINK_SHEET_MODERATORS || '',
            clientEmail: process.env.CLIENT_EMAIL || '',
            privateKey: process.env.PRIVATE_KEY || '',
        });
        const listModeratorsSheetInformationService = new ListModeratorsSheetInformationService(
            spreadsheetsRepository,
        );

        const participants = await listModeratorsSheetInformationService.execute();

        return response.json(participants);
    }
}

export default ModeratorsSheetInformationController;
