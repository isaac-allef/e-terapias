import FieldJournal, { field } from '../entities/FieldJournal';
import CreateFieldJournalRepository from '../protocols/db/repositories/CreateFieldJournalRepository';
import LoadEtherapyByIdRepository from '../protocols/db/repositories/LoadEtherapyByIdRepository';
import LoadModeratorByIdRepository from '../protocols/db/repositories/LoadModeratorByIdRepository';
import { verifyMatchFieldJournalFields } from './utils/VerifyMatchFieldJournalFields';

export type params = {
    name: string;
    date: Date;
    fields: field[];
    moderatorId: string;
    etherapyId: string;
};

class CreateFieldJournalService {
    constructor(
        private createFieldJournalRepository: CreateFieldJournalRepository,
        private loadModeratorByIdRepository: LoadModeratorByIdRepository,
        private loadEtherapyByIdRepository: LoadEtherapyByIdRepository,
    ) {}

    public async execute({
        name,
        date,
        fields,
        moderatorId,
        etherapyId,
    }: params): Promise<FieldJournal> {
        const moderator = await this.loadModeratorByIdRepository.load(
            moderatorId,
        );

        const etherapy = await this.loadEtherapyByIdRepository.load(etherapyId);

        if (!moderator.etherapies.find(e => e.id === etherapy.id)) {
            throw new Error('This moderator is not related to this etherapy.');
        }

        if (!etherapy.template) {
            throw new Error('This therapy does not have a template.');
        }

        const { templateFields } = etherapy.template;

        if (!verifyMatchFieldJournalFields(templateFields, fields)) {
            throw new Error("This field journal doesn't match the template");
        }

        const fieldJournal = await this.createFieldJournalRepository.create({
            name,
            date,
            fields,
            moderator,
            etherapy,
        });

        return fieldJournal;
    }
}

export default CreateFieldJournalService;
