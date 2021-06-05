import { templateField } from '../../entities/Template';
import AppError from '../../errors/AppError';

/* eslint-disable import/prefer-default-export */
export function validateTemplateFields(templateFields: templateField[]): void {
    if (!Object.keys(templateFields).length) {
        throw new AppError('TemplateFields void.');
    }

    templateFields.forEach(fieldTemplate => {
        const LENGTH_FIELD_WITHOUT_OPTIONS = 2;
        const LENGTH_FIELD_WITH_OPTIONS = 3;
        const lengthField = Object.keys(fieldTemplate).length;

        if (
            !(
                lengthField === LENGTH_FIELD_WITHOUT_OPTIONS ||
                lengthField === LENGTH_FIELD_WITH_OPTIONS
            )
        ) {
            throw new AppError(
                'Each object in fieldTemplates must have exactly two or three properties only, name, type and maybe options',
            );
        }

        if (!('name' in fieldTemplate)) {
            throw new AppError('Property name not found.');
        }

        if (!('type' in fieldTemplate)) {
            throw new AppError('Property type not found.');
        }

        if (
            fieldTemplate.type === 'short' ||
            fieldTemplate.type === 'long' ||
            fieldTemplate.type === 'date'
        ) {
            if ('options' in fieldTemplate) {
                throw new AppError(
                    'Property options is not required for types: short, long and date.',
                );
            }

            return;
        }

        if (
            !(
                fieldTemplate.type === 'choice' ||
                fieldTemplate.type === 'check' ||
                fieldTemplate.type === 'dropdown' ||
                fieldTemplate.type === 'linear'
            )
        ) {
            throw new AppError(
                `Type ${fieldTemplate.type} is not a type used by this application.`,
            );
        }

        if (!('options' in fieldTemplate)) {
            throw new AppError(
                'Property options is required for types: choice, check, dropdown and linear',
            );
        }
    });
}
