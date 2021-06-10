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

        if (fieldTemplate.type === 'linear') {
            if (fieldTemplate.options?.length !== 2) {
                throw new AppError(
                    'The lienar type must have two options only: begin and end.',
                );
            }

            const begin = fieldTemplate.options[0];

            if (!['0', '1'].includes(begin)) {
                throw new AppError(
                    'The begin from linear type must be 0 or 1.',
                );
            }

            const end = fieldTemplate.options[1];

            if (!['2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(end)) {
                throw new AppError(
                    'The end from linear type must be between 2 and 10.',
                );
            }
        }
    });
}
