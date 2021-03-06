import ICreateFieldJournalTemplate from '../dtos/ICreateFieldJournalTemplate';
import FieldJournalTemplate from '../typeorm/entities/FieldJournalTemplate';

export default interface IFieldJournalTemplateRepository {
    create(data: ICreateFieldJournalTemplate): Promise<FieldJournalTemplate>;
    findById(id: string): Promise<FieldJournalTemplate | undefined>;
}
