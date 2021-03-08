import { EntityRepository, getRepository, Repository } from 'typeorm';
import Field from '../../../../../typeorm/entities/Field';
import ICreateField from '../../../dtos/ICreateField';
import IFieldRepository from '../../../repositories/IFieldRepository';

@EntityRepository()
class FieldRepository implements IFieldRepository {
    private ormRepository: Repository<Field>;

    constructor() {
        this.ormRepository = getRepository(Field);
    }

    public createWithoutSave({
        name,
        fieldJournal,
        string_value,
        int_value,
        date_value,
        boolean_value,
    }: ICreateField): Field {
        const field = this.ormRepository.create({
            name,
            fieldJournal,
            string_value,
            int_value,
            date_value,
            boolean_value,
        });

        return field;
    }

    public async saveArray(field: Field[]): Promise<void> {
        await this.ormRepository.save(field);
    }
}

export default FieldRepository;
