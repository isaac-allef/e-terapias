import { field } from '../../entities/FieldJournal';
import { templateField } from '../../entities/Template';

/* eslint-disable import/prefer-default-export */
export function verifyMatchFieldJournalFields(
    templateOrOldFields: templateField[] | field[],
    fields: field[],
): boolean {
    const countTemplateOrOldFields = templateOrOldFields.length;
    const countFields = fields.length;

    if (countTemplateOrOldFields !== countFields) {
        return false;
    }

    // eslint-disable-next-line
    for (let i = 0; i < countTemplateOrOldFields; i++) {
        if (
            templateOrOldFields[i].name !== fields[i].name ||
            templateOrOldFields[i].type !== fields[i].type
        ) {
            return false;
        }
    }

    return true;
}
