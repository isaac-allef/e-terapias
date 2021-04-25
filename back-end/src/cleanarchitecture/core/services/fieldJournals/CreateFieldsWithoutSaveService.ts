import AppError from '../../errors/AppError';
import FieldsMatchWithFieldsTemplateService from './FieldsMatchWithFieldTemplatesService';
import FieldRepository from '../../protocols/db/repositories/FieldRepository';
import Field from '../../entities/Field';
import RequestFieldDTO from './dtos/RequestFieldDTO';
import TemplateFieldDTO from './dtos/TemplateFieldDTO';

interface Request {
    fieldTemplates: TemplateFieldDTO[];
    fields: RequestFieldDTO[];
}

class CreateFieldsWithoutSaveService {
    constructor(private fieldRepository: FieldRepository) {}

    public async execute({
        fieldTemplates,
        fields,
    }: Request): Promise<Field[]> {
        const fieldsMatchWithFieldsTemplate = new FieldsMatchWithFieldsTemplateService();
        const matching = fieldsMatchWithFieldsTemplate.execute({
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
                return this.fieldRepository.createWithoutSave({
                    name: field.name,
                    string_value: field.value as string,
                });
            }
            if (field.type === 'int') {
                return this.fieldRepository.createWithoutSave({
                    name: field.name,
                    int_value: field.value as number,
                });
            }

            if (field.type === 'date') {
                return this.fieldRepository.createWithoutSave({
                    name: field.name,
                    date_value: field.value as Date,
                });
            }

            if (field.type === 'boolean') {
                return this.fieldRepository.createWithoutSave({
                    name: field.name,
                    boolean_value: field.value as boolean,
                });
            }

            throw new AppError('Field type not valide.', 500);
        });

        return fieldArray;
    }
}

export default CreateFieldsWithoutSaveService;
