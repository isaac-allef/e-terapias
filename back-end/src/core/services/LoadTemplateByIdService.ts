import Template from '../entities/Template';
import LoadTemplateByIdRepository from '../protocols/db/repositories/LoadTemplateByIdRepository';

class LoadTemplateByIdService {
    constructor(
        private loadTemplateByIdRepository: LoadTemplateByIdRepository,
    ) {}

    public async execute(id: string): Promise<Template> {
        const template = await this.loadTemplateByIdRepository.load(id);

        return template;
    }
}

export default LoadTemplateByIdService;
