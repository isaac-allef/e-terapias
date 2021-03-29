import { Request, Response } from 'express';
import FieldJournalTemplateRepository from '../../../../fieldJournals/infra/typeorm/repositories/FieldJournalTemplateRepository';
import CreateEterapiaService from '../../../services/CreateEterapiaService';
import DeleteEterapiaService from '../../../services/DeleteEterapiaService';
import ShowEterapiaService from '../../../services/ShowEterapiaService';
import UpdateEterapiaService from '../../../services/UpdateEterapiaService';
import EterapiaRepository from '../../typeorm/repositories/EterapiaRepository';

class EterapiaController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name } = request.body;

        const eterapiaRepository = new EterapiaRepository();
        const createEterapiaService = new CreateEterapiaService(
            eterapiaRepository,
        );

        const eterapia = await createEterapiaService.execute({
            name,
        });

        return response.json(eterapia);
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const {
            search,
            relations,
            orderBy,
            orderMethod,
            page,
            limit,
        } = request.query;

        const eterapiaRepository = new EterapiaRepository();

        const eterapias = await eterapiaRepository.all({
            orderBy: orderBy as 'name' | 'created_at' | 'updated_at',
            orderMethod: orderMethod as 'ASC' | 'DESC',
            page: (page as unknown) as number,
            limit: (limit as unknown) as number,
            search: search as string,
            relations: relations as [
                'moderators' | 'fieldJournalTemplate' | 'fieldJournals',
            ],
        });

        return response.json(eterapias);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { relations } = request.query;

        const eterapiaRepository = new EterapiaRepository();
        const findOneEterapia = new ShowEterapiaService(eterapiaRepository);

        const eterapia = await findOneEterapia.execute({
            id,
            relations: relations as
                | ['moderators' | 'fieldJournalTemplate' | 'fieldJournals']
                | undefined,
        });

        return response.json(eterapia);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const { name, fieldJournalTemplateId } = request.body;

        const eterapiaRepository = new EterapiaRepository();
        const fieldJournalTemplateRepository = new FieldJournalTemplateRepository();

        const updateEterapia = new UpdateEterapiaService(
            eterapiaRepository,
            fieldJournalTemplateRepository,
        );

        const eterapia = await updateEterapia.execute({
            id,
            name,
            fieldJournalTemplateId,
        });

        return response.json(eterapia);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const eterapiaRepository = new EterapiaRepository();
        const deleteEterapia = new DeleteEterapiaService(eterapiaRepository);

        const eterapia = await deleteEterapia.execute({ id });

        return response.json(eterapia);
    }
}

export default EterapiaController;
