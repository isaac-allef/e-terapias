import ISpreadsheetsRepository from '../repositories/ISpreadsheetsRepository';
import IEterapiaRepository from '../../eterapias/repositories/IEterapiaRepository';
import IFieldJournalTemplateRepository from '../../fieldJournalsTemplates/repositories/IFieldJournalTemplateRepository';
import CreateEterapiaService from '../../eterapias/services/CreateEterapiaService';

class CreateEterapiasFromSpreadsheetsService {
    constructor(
        private spreadsheetsRepository: ISpreadsheetsRepository,
        private eterapiaRepository: IEterapiaRepository,
        private fieldJournalTemplateRepository: IFieldJournalTemplateRepository,
    ) {}

    public async execute(): Promise<number> {
        const eterapias = await this.spreadsheetsRepository.getPageRows();

        const createEterapia = new CreateEterapiaService(
            this.eterapiaRepository,
            this.fieldJournalTemplateRepository,
        );

        const countNewEterapiasCreated = await eterapias.reduce(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async (count: any, eterapia: any) => {
                try {
                    await createEterapia.execute({
                        name: eterapia.Nome.replace(/\s+/g, ''),
                    });

                    return (await count) + 1;
                } catch (err) {
                    // eslint-disable-next-line no-console
                    console.log({ error: err });

                    return count;
                }
            },
            0,
        );

        return countNewEterapiasCreated as number;
    }
}

export default CreateEterapiasFromSpreadsheetsService;
