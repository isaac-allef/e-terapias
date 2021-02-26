import { getManager, getRepository } from 'typeorm';
import FieldJournal from '../entities/FieldJournal';
import CreateFieldsService from './CreateFieldsService';

interface Field_request {
    name: string;
    type: string;
    value: string | number | Date;
}

interface Request {
    title: string;
    fields: Field_request[];
}

class CreateFieldJournalService {
    public async execute({ title, fields }: Request): Promise<FieldJournal> {
        const fieldJournalRepository = getRepository(FieldJournal);

        const fieldJournal = fieldJournalRepository.create({
            title,
            // moderator: moderator_id,
            // eterapia: eterapia_id,
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
