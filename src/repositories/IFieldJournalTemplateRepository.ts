import ICreateFieldJournalTemplate from '../dtos/ICreateFieldJournalTemplate';
import IFieldJournalTemplate from '../models/IFieldJournalTemplate';

export default interface IFieldJournalTemplateRepository {
    create(data: ICreateFieldJournalTemplate): Promise<IFieldJournalTemplate>;
    findById(id: string): Promise<IFieldJournalTemplate | undefined>;
}
