/* eslint-disable no-continue */
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
        const templateOrOldFieldsName = templateOrOldFields[i].name;
        const templateOrOldFieldsType = templateOrOldFields[i].type;
        const templateOrOldFieldsOptions = templateOrOldFields[i].options;

        const fieldsName = fields[i].name;
        const fieldsType = fields[i].type;
        const fieldsOptions = fields[i].options;
        const fieldsValue = fields[i].value;

        if (
            templateOrOldFieldsName !== fieldsName ||
            templateOrOldFieldsType !== fieldsType
        ) {
            return false;
        }

        if (
            JSON.stringify(templateOrOldFieldsOptions) !==
            JSON.stringify(fieldsOptions)
        ) {
            return false;
        }

        if (fieldsType === 'short' || fieldsType === 'long') {
            continue;
        }

        if (fieldsType === 'date') {
            if (fieldsValue !== '' && !Date.parse(fieldsValue as string)) {
                throw new Error('Type date must be a instance of Date or "".');
            }
            continue;
        }

        if (!fieldsOptions) {
            throw Error(
                'In types: choice, check, dropdown and linear must have options field.',
            );
        }

        if (fieldsType === 'check') {
            const arrayValue = fieldsValue as string[];
            if (
                arrayValue !== [] &&
                !arrayValue.every(value =>
                    templateOrOldFieldsOptions?.includes(value),
                )
            ) {
                throw new Error(
                    'In check type the values must be equal somes option or [].',
                );
            }
        }

        if (fieldsType === 'choice' || fieldsType === 'dropdown') {
            if (
                fieldsValue !== '' &&
                !templateOrOldFieldsOptions?.includes(fieldsValue as string)
            ) {
                throw new Error(
                    'In types: choice and dropdown the value must be equal some option or "".',
                );
            }
        }

        if (fieldsType === 'linear') {
            // eslint-disable-next-line radix
            const begin = parseInt(fieldsOptions[0]);
            // eslint-disable-next-line radix
            const end = parseInt(fieldsOptions[1]);
            // eslint-disable-next-line radix
            const fieldsValueInt = parseInt(fieldsValue as string);

            if (!(fieldsValueInt >= begin && fieldsValueInt <= end)) {
                throw new Error(
                    'In type linear the value must be between first option and second option.',
                );
            }
        }
    }

    return true;
}
