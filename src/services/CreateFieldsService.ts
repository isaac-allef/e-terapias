import { EntityManager, getRepository } from 'typeorm';
import Field from '../entities/Field';
import FieldJournal from '../entities/FieldJournal';
import AppError from '../errors/AppError';
import FieldsMatchWithFieldsTemplateService from './FieldsMatchWithFieldTemplatesService';

interface Field_request {
    name: string;
    type: string;
    value: string | number | Date | boolean;
}

interface Request {
    transactionalEntityManager: EntityManager;
    fieldJournal: FieldJournal;
    fields: Field_request[];
}

class CreateFieldsService {
    public async execute({
        transactionalEntityManager,
        fieldJournal,
        fields,
    }: Request): Promise<Field[]> {
        const fieldRepository = getRepository(Field);

        const {
            fieldTemplates,
        } = fieldJournal.eterapia.fieldJournalTemplate.description;

        const fieldsMatchWithFieldsTemplate = new FieldsMatchWithFieldsTemplateService();
        const matching = await fieldsMatchWithFieldsTemplate.execute({
            fields,
            fieldTemplates,
        });

        if (!matching) {
            throw new AppError(
                'No matching between fields and field templates',
            );
        }

        const fieldArray = fields.map(field => {
            if (field.type === 'string') {
                return fieldRepository.create({
                    name: field.name,
                    string_value: field.value as string,
                    fieldJournal,
                });
            }
            if (field.type === 'int') {
                return fieldRepository.create({
                    name: field.name,
                    int_value: field.value as number,
                    fieldJournal,
                });
            }

            if (field.type === 'date') {
                return fieldRepository.create({
                    name: field.name,
                    date_value: field.value as Date,
                    fieldJournal,
                });
            }

            if (field.type === 'boolean') {
                return fieldRepository.create({
                    name: field.name,
                    boolean_value: field.value as boolean,
                    fieldJournal,
                });
            }

            throw new AppError('Field type not valide.', 500);
        });

        await transactionalEntityManager.save(fieldArray);

        return fieldArray;
    }
}

export default CreateFieldsService;
