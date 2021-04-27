import Template, { templateField } from '../../../entities/Template';

export default interface CreateFieldJournalRepository {
    create(name: string, templateFields: templateField[]): Promise<Template>;
}
