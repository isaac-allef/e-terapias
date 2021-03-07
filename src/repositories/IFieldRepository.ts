import ICreateField from '../dtos/ICreateField';
import Field from '../typeorm/entities/Field';

export default interface IFieldRepository {
    createWithoutSave(data: ICreateField): Field;
    saveArray(field: Field[]): Promise<void>;
}
