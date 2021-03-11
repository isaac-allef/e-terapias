import IField from '../models/IField';
import IFieldJournal from '../models/IFieldJournal';

interface IUpdateField {
    id: number;
    value: string | number | Date | boolean;
}

interface Request {
    updateFields: IUpdateField[];
}

class UpdateFieldsService {
    constructor(private fieldJournal: IFieldJournal) {}

    public execute({ updateFields }: Request): void {
        this.fieldJournal.fields.map(field => {
            updateFields.forEach(updateField => {
                if (updateField.id === field.id) {
                    if (this.whatTypeField(field) === 'string') {
                        // eslint-disable-next-line no-param-reassign
                        field.string_value = updateField.value as string;
                    }
                    if (this.whatTypeField(field) === 'int') {
                        // eslint-disable-next-line no-param-reassign
                        field.int_value = updateField.value as number;
                    }
                    if (this.whatTypeField(field) === 'date') {
                        // eslint-disable-next-line no-param-reassign
                        field.date_value = updateField.value as Date;
                    }
                    if (this.whatTypeField(field) === 'booblen') {
                        // eslint-disable-next-line no-param-reassign
                        field.boolean_value = updateField.value as boolean;
                    }
                }
            });
            return field;
        });
    }

    private whatTypeField(field: IField): string | undefined {
        if (field.string_value) {
            return 'string';
        }
        if (field.int_value) {
            return 'int';
        }
        if (field.date_value) {
            return 'date';
        }
        if (field.boolean_value) {
            return 'boolean';
        }

        return undefined;
    }
}

export default UpdateFieldsService;
