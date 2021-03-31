import ICreateFieldJournalTemplate from '../dtos/ICreateFieldJournalTemplate';
import IFindByIdFieldJournalTemplate from '../dtos/IFindByIdFieldJournalTemplate';
import IListFieldJournalsTemplates from '../dtos/IListFieldJournalsTemplates';
import IFieldJournalTemplate from '../models/IFieldJournalTemplate';

export default interface IFieldJournalTemplateRepository {
    create(data: ICreateFieldJournalTemplate): Promise<IFieldJournalTemplate>;
    findById(
        data: IFindByIdFieldJournalTemplate,
    ): Promise<IFieldJournalTemplate | undefined>;
    all(
        data: IListFieldJournalsTemplates,
    ): Promise<IFieldJournalTemplate[] | []>;
    delete(fieldJournalTemplate: IFieldJournalTemplate): Promise<void>;
}
