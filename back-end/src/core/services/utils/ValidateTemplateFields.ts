import { templateField } from '../../entities/Template';
import AppError from '../../errors/AppError';

/* eslint-disable import/prefer-default-export */
export function validateTemplateFields(templateFields: templateField[]): void {
    if (!Object.keys(templateFields).length) {
        throw new AppError('TemplateFields void.');
    }

    templateFields.forEach(fieldTemplate => {
        const LENGTH_FIELD = 2;
        const lengthField = Object.keys(fieldTemplate).length;

        if (!(lengthField === LENGTH_FIELD)) {
            throw new AppError(
                'Each object in fieldTemplates must have exactly two properties only, name and type',
            );
        }

        if (!('name' in fieldTemplate)) {
            throw new AppError('Property name not found.');
        }

        if (!('type' in fieldTemplate)) {
            throw new AppError('Property type not found.');
        }
    });
}
