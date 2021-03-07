import { getManager } from 'typeorm';
import FieldJournal from '../typeorm/entities/FieldJournal';
import AppError from '../errors/AppError';
import AddFieldsService from './AddFieldsService';
import FieldJournalRepository from '../typeorm/repositories/FieldJournalRepository';
import ModeratorRepository from '../typeorm/repositories/ModeratorRepository';
import FieldRepository from '../typeorm/repositories/FieldRepository';

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
    constructor(
        private fieldJournalRepository: FieldJournalRepository,
        private fieldRepository: FieldRepository,
        private moderatorRepository: ModeratorRepository,
    ) {}

    public async execute({
        title,
        fields,
        eterapiaId,
        moderatorId,
    }: Request): Promise<FieldJournal> {
        const moderator = await this.moderatorRepository.findById(moderatorId);

        if (!moderator) {
            throw new AppError('Moderator not found.');
        }

        const eterapia = moderator.eterapias.find(ete => ete.id === eterapiaId);

        if (!eterapia) {
            throw new AppError('Eterapia not found in this relationship.');
        }

        const fieldJournal = this.fieldJournalRepository.createWithoutSave({
            title,
            eterapia,
            moderator,
        });
        // await this.fieldJournalRepository.save(fieldJournal);

        const createFieldsService = new AddFieldsService(this.fieldRepository);
        const fieldArray = await createFieldsService.execute({
            fieldJournal,
            fields,
        });
        // this.fieldRepository.saveArray(fieldArray);

        await getManager().transaction(async transactionalEntityManager => {
            await transactionalEntityManager.save(fieldJournal);
            await transactionalEntityManager.save(fieldArray);
        });

        return fieldJournal;
    }
}

export default CreateFieldJournalService;
