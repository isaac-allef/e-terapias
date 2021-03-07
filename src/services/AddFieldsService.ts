import AppError from '../errors/AppError';
import FieldsMatchWithFieldsTemplateService from './FieldsMatchWithFieldTemplatesService';
import IFieldRepository from '../repositories/IFieldRepository';
import IFieldJournal from '../models/IFieldJournal';
import IField from '../models/IField';

interface Field_request {
    name: string;
    type: string;
    value: string | number | Date | boolean;
}

interface Request {
    fieldJournal: IFieldJournal;
    fields: Field_request[];
}

class AddFieldsService {
    constructor(private fieldRepository: IFieldRepository) {}

    public async execute({ fieldJournal, fields }: Request): Promise<IField[]> {
        const {
            fieldTemplates,
        } = fieldJournal.eterapia.fieldJournalTemplate.description;

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
                    fieldJournal,
                });
            }
            if (field.type === 'int') {
                return this.fieldRepository.createWithoutSave({
                    name: field.name,
                    int_value: field.value as number,
                    fieldJournal,
                });
            }

            if (field.type === 'date') {
                return this.fieldRepository.createWithoutSave({
                    name: field.name,
                    date_value: field.value as Date,
                    fieldJournal,
                });
            }

            if (field.type === 'boolean') {
                return this.fieldRepository.createWithoutSave({
                    name: field.name,
                    boolean_value: field.value as boolean,
                    fieldJournal,
                });
            }

            throw new AppError('Field type not valide.', 500);
        });

        return fieldArray;
    }
}

export default AddFieldsService;
