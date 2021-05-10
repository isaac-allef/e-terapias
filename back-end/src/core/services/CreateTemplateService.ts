import Template, { templateField } from '../entities/Template';
import AppError from '../errors/AppError';
import CreateTemplateRepository from '../protocols/db/repositories/CreateTemplateRepository';
import LinkTemplateToEtherapiesRepository from '../protocols/db/repositories/LinkTemplateToEtherapiesRepository';

export type params = {
    name: string;
    templateFields: templateField[];
    etherapiesIds: string[];
};

class CreateTemplateService {
    constructor(
        private createTemplateRepository: CreateTemplateRepository,
        private linkTemplateToEtherapiesRepository: LinkTemplateToEtherapiesRepository,
    ) {}

    public async execute({
        name,
        templateFields,
        etherapiesIds,
    }: params): Promise<Template> {
        this.validateTemplateFields(templateFields);

        const template = await this.createTemplateRepository.create({
            name,
            templateFields,
        });

        await this.linkTemplateToEtherapiesRepository.linkTemplate(
            template,
            etherapiesIds,
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

export default CreateTemplateService;
