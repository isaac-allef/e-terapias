import AppError from '../../../shared/errors/AppError';
import IFieldJournal from '../models/IFieldJournal';
import IFieldJournalRepository from '../repositories/IFieldJournalRepository';
import UpdateFieldsService from './UpdateFieldsService';

interface IUpdateField {
    id: number;
    value: string | number | Date | boolean;
}

interface Request {
    id: string;
    moderatorId: string;
    title: string;
    updateFields: IUpdateField[];
}

class UpdateFieldJournalService {
    constructor(private fieldJournalRepository: IFieldJournalRepository) {}

    public async execute({
        id,
        moderatorId,
        title,
        updateFields,
    }: Request): Promise<IFieldJournal> {
        const fieldJournal = await this.fieldJournalRepository.findById({
            id,
            relations: ['moderator'],
        });

        if (!fieldJournal) {
            throw new AppError('Field Journal not found.');
        }

        if (moderatorId !== fieldJournal.moderator.id) {
            throw new AppError(
                "You cannot change another moderator's field journal",
            );
        }

        if (title) {
            fieldJournal.title = title;
        }

        if (updateFields) {
            const updateFieldsService = new UpdateFieldsService(fieldJournal);
            updateFieldsService.execute({ updateFields });
        }

        await this.fieldJournalRepository.save(fieldJournal);

        return fieldJournal;
    }
}

export default UpdateFieldJournalService;
