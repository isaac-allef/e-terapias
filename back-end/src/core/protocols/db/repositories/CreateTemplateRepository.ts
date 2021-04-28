import Template, { templateField } from '../../../entities/Template';

export type params = {
    name: string;
    templateFields: templateField[];
};

export default interface CreateFieldJournalRepository {
    create({ name, templateFields }: params): Promise<Template>;
}
