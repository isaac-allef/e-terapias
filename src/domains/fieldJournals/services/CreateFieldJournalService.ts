import { getManager } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import IFieldJournal from '../models/IFieldJournal';
import IFieldJournalRepository from '../repositories/IFieldJournalRepository';
import IFieldRepository from '../repositories/IFieldRepository';
import IModeratorRepository from '../../moderators/repositories/IModeratorRepository';
import AddFieldsService from './AddFieldsService';

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
        private fieldJournalRepository: IFieldJournalRepository,
        private fieldRepository: IFieldRepository,
        private moderatorRepository: IModeratorRepository,
    ) {}

    public async execute({
        title,
        fields,
        eterapiaId,
        moderatorId,
    }: Request): Promise<IFieldJournal> {
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
