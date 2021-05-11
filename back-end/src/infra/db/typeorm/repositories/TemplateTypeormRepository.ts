/* eslint-disable no-restricted-syntax */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Template from '../../../../core/entities/Template';
import CreateTemplateRepository, {
    params as createParams,
} from '../../../../core/protocols/db/repositories/CreateTemplateRepository';
import LoadTemplateByIdRepository from '../../../../core/protocols/db/repositories/LoadTemplateByIdRepository';
import UpdateTemplateRepository, {
    params as updateParams,
} from '../../../../core/protocols/db/repositories/UpdateTemplateRepository';
import TemplateTypeorm from '../entities/TemplateTypeorm';

@EntityRepository()
class TemplateTypeormRepository
    implements
        CreateTemplateRepository,
        LoadTemplateByIdRepository,
        UpdateTemplateRepository {
    private ormRepository: Repository<TemplateTypeorm>;

    constructor() {
        this.ormRepository = getRepository(TemplateTypeorm);
    }

    public async create(data: createParams): Promise<Template> {
        try {
            const template = this.ormRepository.create({
                name: data.name,
                templateFields: data.templateFields,
            });

            await this.ormRepository.save(template);

            return template;
        } catch {
            throw new Error('Create template error');
        }
    }

    async load(id: string): Promise<Template> {
        try {
            const template = await this.ormRepository.findOne({
                where: { id },
                relations: ['etherapies'],
            });

            if (!template) {
                throw new Error('Template not found');
            }

            return template;
        } catch {
            throw new Error('Load template error');
        }
    }

    async update({ id, description }: updateParams): Promise<Template> {
        try {
            const { name, templateFields } = description;

            const template = await this.ormRepository.findOne({
                where: { id },
            });

            if (!template) {
                throw new Error('Template not found');
            }

            template.name = name;
            template.templateFields = templateFields;

            await this.ormRepository.save(template);

            return template;
        } catch (err) {
            throw new Error('Update template error');
        }
    }
}

export default TemplateTypeormRepository;
