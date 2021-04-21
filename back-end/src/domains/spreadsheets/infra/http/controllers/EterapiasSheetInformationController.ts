import { Request, Response } from 'express';
import EterapiaRepository from '../../../../eterapias/infra/typeorm/repositories/EterapiaRepository';
import FieldJournalTemplateRepository from '../../../../fieldJournalsTemplates/infra/typeorm/repositories/FieldJournalTemplateRepository';
import CreateEterapiasFromSpreadsheetsService from '../../../services/CreateEterapiasFromSpreadsheetsService';
import SpreadsheetsRepository from '../cms-sheets/SpreadsheetsRepository';

class EterapiasSheetInformationController {
    public async create(
        _request: Request,
        response: Response,
    ): Promise<Response> {
        const spreadsheetsRepository = new SpreadsheetsRepository({
            link: process.env.LINK_SHEET_ETERAPIAS || '',
            clientEmail: process.env.CLIENT_EMAIL || '',
            privateKey: process.env.PRIVATE_KEY || '',
        });

        const eterapiaRepository = new EterapiaRepository();
        const fieldJournalTemplateRepository = new FieldJournalTemplateRepository();

        const createEterapiasFromSpreadsheets = new CreateEterapiasFromSpreadsheetsService(
            spreadsheetsRepository,
            eterapiaRepository,
            fieldJournalTemplateRepository,
        );

        const numberOfNewEterapiasCreated = await createEterapiasFromSpreadsheets.execute();

        return response.json({ numberOfNewEterapiasCreated });
    }
}

export default EterapiasSheetInformationController;
