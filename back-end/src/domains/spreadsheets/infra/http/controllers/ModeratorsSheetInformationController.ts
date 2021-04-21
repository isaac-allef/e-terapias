import { Request, Response } from 'express';
import BCryptHashProvider from '../../../../../shared/providers/HashProvider/implementations/BCryptHashProvider';
import ModeratorRepository from '../../../../moderators/infra/typeorm/repositories/ModeratorRepository';
import CreateModeratorsFromSpreadsheetsService from '../../../services/CreateModeratorsFromSpreadsheetsService';
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

        response.set('X-Total-Count', participants.length.toString());
        return response.json(participants);
    }

    public async create(
        _request: Request,
        response: Response,
    ): Promise<Response> {
        const spreadsheetsRepository = new SpreadsheetsRepository({
            link: process.env.LINK_SHEET_MODERATORS || '',
            clientEmail: process.env.CLIENT_EMAIL || '',
            privateKey: process.env.PRIVATE_KEY || '',
        });

        const moderatorRepository = new ModeratorRepository();
        const hashProvider = new BCryptHashProvider();

        const createModeratorsFromSpreadsheets = new CreateModeratorsFromSpreadsheetsService(
            spreadsheetsRepository,
            moderatorRepository,
            hashProvider,
        );

        const numberOfNewModeratorsCreated = await createModeratorsFromSpreadsheets.execute();

        return response.json({ numberOfNewModeratorsCreated });
    }
}

export default ModeratorsSheetInformationController;
