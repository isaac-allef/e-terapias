import AppError from '../../../shared/errors/AppError';
import IFieldJournalTemplateRepository from '../../fieldJournals/repositories/IFieldJournalTemplateRepository';
import ICreateEterapiaDTO from '../dtos/ICreateEterapiaDTO';
import IEterapia from '../models/IEterapia';
import IEterapiaRepository from '../repositories/IEterapiaRepository';

interface Request extends ICreateEterapiaDTO {
    id: string;
    fieldJournalTemplateId: string;
}

class UpdateEterapiaService {
    constructor(
        private eterapiaRepository: IEterapiaRepository,
        private fieldJournalTemplateRepository: IFieldJournalTemplateRepository,
    ) {}

    public async execute({
        id,
        name,
        fieldJournalTemplateId,
    }: Request): Promise<IEterapia> {
        const eterapia = await this.eterapiaRepository.findById({ id });

        if (!eterapia) {
            throw new AppError('Eterapia not found.');
        }

        if (name) {
            eterapia.name = name;
        }

        if (fieldJournalTemplateId) {
            const fieldJournalTemplate = await this.fieldJournalTemplateRepository.findById(
                fieldJournalTemplateId,
            );

            if (!fieldJournalTemplate) {
                throw new AppError('Field journal template not found.');
            }

            eterapia.fieldJournalTemplate = fieldJournalTemplate;
        }

        this.eterapiaRepository.save(eterapia);

        return eterapia;
    }
}

export default UpdateEterapiaService;
