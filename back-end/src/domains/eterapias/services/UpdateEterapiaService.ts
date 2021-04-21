import AppError from '../../../shared/errors/AppError';
import IFieldJournalTemplateRepository from '../../fieldJournalsTemplates/repositories/IFieldJournalTemplateRepository';
import ICreateEterapiaDTO from '../dtos/ICreateEterapiaDTO';
import IEterapia from '../models/IEterapia';
import IEterapiaRepository from '../repositories/IEterapiaRepository';
import FindFieldJournalTemplateByIdService from './FindFieldJournalTemplateByIdService';

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
            const findFieldJournalTemplateByIdService = new FindFieldJournalTemplateByIdService(
                this.fieldJournalTemplateRepository,
            );

            const fieldJournalTemplate = await findFieldJournalTemplateByIdService.execute(
                { fieldJournalTemplateId },
            );

            eterapia.fieldJournalTemplate = fieldJournalTemplate;
        }

        this.eterapiaRepository.save(eterapia);

        return eterapia;
    }
}

export default UpdateEterapiaService;
