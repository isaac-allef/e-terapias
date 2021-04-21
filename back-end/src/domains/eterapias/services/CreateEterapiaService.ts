import AppError from '../../../shared/errors/AppError';
import IFieldJournalTemplateRepository from '../../fieldJournalsTemplates/repositories/IFieldJournalTemplateRepository';
import ICreateEterapiaDTO from '../dtos/ICreateEterapiaDTO';
import IEterapia from '../models/IEterapia';
import IEterapiaRepository from '../repositories/IEterapiaRepository';
import FindFieldJournalTemplateByIdService from './FindFieldJournalTemplateByIdService';

class CreateEterapiaService {
    constructor(
        private eterapiaRepository: IEterapiaRepository,
        private fieldJournalTemplateRepository: IFieldJournalTemplateRepository,
    ) {}

    public async execute({
        name,
        fieldJournalTemplateId,
    }: ICreateEterapiaDTO): Promise<IEterapia> {
        const checkEterapiasExists = await this.eterapiaRepository.findByName({
            name,
        });

        if (checkEterapiasExists) {
            throw new AppError('Name already used.');
        }

        const eterapia = this.eterapiaRepository.createWithoutSave({
            name,
        });

        if (fieldJournalTemplateId) {
            const findFieldJournalTemplateByIdService = new FindFieldJournalTemplateByIdService(
                this.fieldJournalTemplateRepository,
            );

            const fieldJournalTemplate = await findFieldJournalTemplateByIdService.execute(
                { fieldJournalTemplateId },
            );

            eterapia.fieldJournalTemplate = fieldJournalTemplate;
        }

        await this.eterapiaRepository.save(eterapia);

        return eterapia;
    }
}

export default CreateEterapiaService;
