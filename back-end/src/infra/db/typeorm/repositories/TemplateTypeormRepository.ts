/* eslint-disable no-restricted-syntax */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Template from '../../../../core/entities/Template';
import CreateTemplateRepository, {
    params,
} from '../../../../core/protocols/db/repositories/CreateTemplateRepository';
import TemplateTypeorm from '../entities/TemplateTypeorm';

@EntityRepository()
class TemplateTypeormRepository implements CreateTemplateRepository {
    private ormRepository: Repository<TemplateTypeorm>;

    constructor() {
        this.ormRepository = getRepository(TemplateTypeorm);
    }

    public async create(data: params): Promise<Template> {
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
}

export default TemplateTypeormRepository;
