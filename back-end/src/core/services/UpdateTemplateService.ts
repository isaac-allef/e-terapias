import Template, { templateField } from '../entities/Template';
import AppError from '../errors/AppError';
import UpdateTemplateRepository from '../protocols/db/repositories/UpdateTemplateRepository';
import LinkTemplateToEtherapiesRepository from '../protocols/db/repositories/LinkTemplateToEtherapiesRepository';

export type params = {
    id: string;
    description: {
        name: string;
        templateFields: templateField[];
        etherapiesIds: string[];
    };
};

class UpdateTemplateService {
    constructor(
        private updateTemplateRepository: UpdateTemplateRepository,
        private linkTemplateToEtherapiesRepository: LinkTemplateToEtherapiesRepository,
    ) {}

    public async execute({ id, description }: params): Promise<Template> {
        this.validateTemplateFields(description.templateFields);

        const template = await this.updateTemplateRepository.update({
            id,
            description,
        });

        const { etherapiesIds } = description;

        await this.linkTemplateToEtherapiesRepository.linkTemplate(
            template,
            etherapiesIds,
            true,
        );

        return template;
    }

    private validateTemplateFields(templateFields: templateField[]) {
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
}

export default UpdateTemplateService;
