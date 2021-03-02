import { getManager, getRepository } from 'typeorm';
import Eterapia from '../entities/Eterapia';
import FieldJournal from '../entities/FieldJournal';
import Moderator from '../entities/Moderator';
import CreateFieldsService from './CreateFieldsService';
import GetEterapiaByIdService from './GetEterapiaByIdService';
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
        const eterapiaRepository = getRepository(Eterapia);
        const moderatorRepository = getRepository(Moderator);

        const getEterapiaById = new GetEterapiaByIdService();
        const eterapia = await getEterapiaById.execute({
            eterapiaId,
            eterapiaRepository,
        });

        const getModeratorById = new GetModeratorByIdService();
        const moderator = await getModeratorById.execute({
            moderatorId,
            moderatorRepository,
        });

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
