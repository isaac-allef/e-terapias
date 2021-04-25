import AppError from '../../errors/AppError';
import FieldJournalTemplateRepository from '../../protocols/db/repositories/FieldJournalTemplateRepository';
import CreateEterapiaDTO from './dtos/CreateEterapiaDTO';
import Eterapia from '../../entities/Eterapia';
import EterapiaRepository from '../../protocols/db/repositories/EterapiaRepository';
import FindFieldJournalTemplateByIdService from './FindFieldJournalTemplateByIdService';

interface Request extends CreateEterapiaDTO {
    id: string;
    fieldJournalTemplateId: string;
}

class UpdateEterapiaService {
    constructor(
        private eterapiaRepository: EterapiaRepository,
        private fieldJournalTemplateRepository: FieldJournalTemplateRepository,
    ) {}

    public async execute({
        id,
        name,
        fieldJournalTemplateId,
    }: Request): Promise<Eterapia> {
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
