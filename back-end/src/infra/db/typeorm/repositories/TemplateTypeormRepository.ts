/* eslint-disable no-restricted-syntax */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Template from '../../../../core/entities/Template';
import CreateTemplateRepository, {
    params as createParams,
} from '../../../../core/protocols/db/repositories/CreateTemplateRepository';
import LoadAllTemplatesRepository, {
    params as loadAllParams,
} from '../../../../core/protocols/db/repositories/LoadAllTemplatesRepository';
import LoadTemplateByIdRepository from '../../../../core/protocols/db/repositories/LoadTemplateByIdRepository';
import SearchTemplatesRepository, {
    params as searchParams,
} from '../../../../core/protocols/db/repositories/SearchTemplatesRepository';
import UpdateTemplateRepository, {
    params as updateParams,
} from '../../../../core/protocols/db/repositories/UpdateTemplateRepository';
import TemplateTypeorm from '../entities/TemplateTypeorm';

@EntityRepository()
class TemplateTypeormRepository
    implements
        CreateTemplateRepository,
        LoadTemplateByIdRepository,
        UpdateTemplateRepository,
        LoadAllTemplatesRepository,
        SearchTemplatesRepository {
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

    async loadAll({
        sort,
        direction,
        per_page,
        page,
    }: loadAllParams): Promise<Template[]> {
        try {
            const templates = await this.ormRepository.find({
                order: { [sort]: direction.toUpperCase() },
                take: per_page,
                skip: (page - 1) * per_page,
                relations: ['etherapies'],
            });

            return templates;
        } catch (err) {
            throw new Error('Load all templates error');
        }
    }

    async search({
        keywords,
        per_page,
        page,
    }: searchParams): Promise<Template[]> {
        try {
            const queryBuilder = this.ormRepository.createQueryBuilder(
                'Template',
            );

            const finded = queryBuilder
                .leftJoinAndSelect('Template.etherapies', 'etherapies')
                .where('Template.name ILIKE :name', {
                    name: `%${keywords}%`,
                })
                .orWhere('etherapies.name ILIKE :name', {
                    name: `%${keywords}%`,
                })
                .orWhere('etherapies.identifier ILIKE :identifier', {
                    identifier: `%${keywords}%`,
                })
                .take(per_page)
                .skip((page - 1) * per_page)
                .getMany();

            return finded;
        } catch {
            throw new Error('Search templates error');
        }
    }
}

export default TemplateTypeormRepository;
