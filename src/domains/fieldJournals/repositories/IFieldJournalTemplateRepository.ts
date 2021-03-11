import ICreateFieldJournalTemplate from '../dtos/ICreateFieldJournalTemplate';
import IFieldJournalTemplate from '../models/IFieldJournalTemplate';

export default interface IFieldJournalTemplateRepository {
    create(data: ICreateFieldJournalTemplate): Promise<IFieldJournalTemplate>;
    findById(id: string): Promise<IFieldJournalTemplate | undefined>;
    all(
        orderBy: 'name' | 'created_at' | 'updated_at',
        orderMethod: 'ASC' | 'DESC',
        page: number,
        limit: number,
        search: string,
    ): Promise<IFieldJournalTemplate[] | []>;
    delete(fieldJournalTemplate: IFieldJournalTemplate): Promise<void>;
}
