import { getManager, getRepository } from 'typeorm';
import FieldJournal from '../entities/FieldJournal';
import Moderator from '../entities/Moderator';
import AppError from '../errors/AppError';
import CreateFieldsService from './CreateFieldsService';
import GetModeratorByIdService from './GetModeratorByIdService';

interface Field_request {
    name: string;
    type: string;
    value: string | number | Date | boolean;
}

interface Request {
    title: string;
    fields: Field_request[];
    eterapiaId: string;
    moderatorId: string;
}

class CreateFieldJournalService {
    public async execute({
        title,
        fields,
        eterapiaId,
        moderatorId,
    }: Request): Promise<FieldJournal> {
        const fieldJournalRepository = getRepository(FieldJournal);
        const moderatorRepository = getRepository(Moderator);

        const getModeratorById = new GetModeratorByIdService();
        const moderator = await getModeratorById.execute({
            moderatorId,
            moderatorRepository,
        });

        const eterapia = moderator.eterapias.find(ete => ete.id === eterapiaId);

        if (!eterapia) {
            throw new AppError('Eterapia not found in this relationship.');
        }

        const fieldJournal = fieldJournalRepository.create({
            title,
            eterapia,
            moderator,
        });

        await getManager().transaction(async transactionalEntityManager => {
            await transactionalEntityManager.save(fieldJournal);

            const createFieldsService = new CreateFieldsService();
            await createFieldsService.execute({
                transactionalEntityManager,
                fieldJournal,
                fields,
            });
        });
        return fieldJournal;
    }
}

export default CreateFieldJournalService;
