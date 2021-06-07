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

        if (
            JSON.stringify(templateOrOldFields[i].options) !==
            JSON.stringify(fields[i].options)
        ) {
            return false;
        }

        if (fields[i].type === 'date') {
            if (!Date.parse(fields[i].value as string)) {
                throw new Error('Type date must be a instance of Date.');
            }
        }

        if (fields[i].type === 'check') {
            const arrayValue = fields[i].value as string[];
            if (
                !arrayValue.every(value =>
                    templateOrOldFields[i].options?.includes(value),
                )
            ) {
                throw new Error('The values must be equal somes option.');
            }
        }

        if (
            fields[i].type === 'choice' ||
            fields[i].type === 'dropdown' ||
            fields[i].type === 'linear'
        ) {
            if (
                !templateOrOldFields[i].options?.includes(
                    fields[i].value as string,
                )
            ) {
                throw new Error('The value must be equal some option.');
            }
        }
    }

    return true;
}
