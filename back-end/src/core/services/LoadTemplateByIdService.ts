import Template from '../entities/Template';
import AppError from '../errors/AppError';
import LoadTemplateByIdRepository from '../protocols/db/repositories/LoadTemplateByIdRepository';

class LoadTemplateByIdService {
    constructor(
        private loadTemplateByIdRepository: LoadTemplateByIdRepository,
    ) {}

    public async execute(id: string): Promise<Template> {
        const template = await this.loadTemplateByIdRepository.load(id);

        if (!template) {
            throw new AppError('Template not found.');
        }

        return template;
    }
}

export default LoadTemplateByIdService;
