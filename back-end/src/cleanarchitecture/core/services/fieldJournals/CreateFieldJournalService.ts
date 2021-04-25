import AppError from '../../errors/AppError';
import FieldJournal from '../../entities/FieldJournal';
import FieldJournalRepository from '../../protocols/db/repositories/FieldJournalRepository';
import FieldRepository from '../../protocols/db/repositories/FieldRepository';
import ModeratorRepository from '../../protocols/db/repositories/ModeratorRepository';
import CreateFieldsWithoutSaveService from './CreateFieldsWithoutSaveService';
import RequestFieldDTO from './dtos/RequestFieldDTO';

interface Request {
    title: string;
    fields: RequestFieldDTO[];
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
        const moderator = await this.moderatorRepository.findById({
            id: moderatorId,
            relations: ['eterapias', 'eterapias.fieldJournalTemplate'],
        });

        if (!moderator) {
            throw new AppError('Moderator not found.');
        }

        const eterapia = moderator.eterapias.find(
            (ete: { id: string }) => ete.id === eterapiaId,
        );

        if (!eterapia) {
            throw new AppError('Eterapia not found in this relationship.');
        }

        const { fieldJournalTemplate } = eterapia;

        if (!fieldJournalTemplate) {
            throw new AppError(
                "This eterapia doesn't have a field journal template",
            );
        }

        const fieldJournal = this.fieldJournalRepository.createWithoutSave({
            title,
            eterapia,
            moderator,
        });

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
