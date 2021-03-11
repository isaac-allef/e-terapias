import AppError from '../../../shared/errors/AppError';
import IFieldJournal from '../models/IFieldJournal';
import IFieldJournalRepository from '../repositories/IFieldJournalRepository';
import IFieldRepository from '../repositories/IFieldRepository';
import IModeratorRepository from '../../moderators/repositories/IModeratorRepository';
import CreateFieldsWithoutSaveService from './CreateFieldsWithoutSaveService';
import IRequestField from '../dtos/IRequestField';

interface Request {
    title: string;
    fields: IRequestField[];
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

        const { fieldJournalTemplate } = fieldJournal.eterapia;

        if (!fieldJournalTemplate) {
            throw new AppError(
                "This eterapia doesn't have a field journal template",
            );
        }

        const { fieldTemplates } = fieldJournalTemplate.description;

        const createFieldsService = new CreateFieldsWithoutSaveService(
            this.fieldRepository,
        );
        const fieldArray = await createFieldsService.execute({
            fieldTemplates,
            fields,
        });

        fieldJournal.fields = fieldArray;
        await this.fieldJournalRepository.save(fieldJournal);

        return fieldJournal;
    }
}

export default CreateFieldJournalService;
