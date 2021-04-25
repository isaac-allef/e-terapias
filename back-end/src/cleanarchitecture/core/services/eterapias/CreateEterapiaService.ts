import AppError from '../../errors/AppError';
import FieldJournalTemplateRepository from '../../protocols/db/repositories/FieldJournalTemplateRepository';
import CreateEterapiaDTO from './dtos/CreateEterapiaDTO';
import Eterapia from '../../entities/Eterapia';
import EterapiaRepository from '../../protocols/db/repositories/EterapiaRepository';
import FindFieldJournalTemplateByIdService from './FindFieldJournalTemplateByIdService';

class CreateEterapiaService {
    constructor(
        private eterapiaRepository: EterapiaRepository,
        private fieldJournalTemplateRepository: FieldJournalTemplateRepository,
    ) {}

    public async execute({
        name,
        fieldJournalTemplateId,
    }: CreateEterapiaDTO): Promise<Eterapia> {
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
