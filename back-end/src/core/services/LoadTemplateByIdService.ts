import Template from '../entities/Template';
import LoadTemplateByIdRepository from '../protocols/db/repositories/LoadTemplateByIdRepository';

class LoadTemplateByIdService {
    constructor(
        private loadTemplateByIdRepository: LoadTemplateByIdRepository,
    ) {}

    public async execute(id: string): Promise<Template> {
        return this.loadTemplateByIdRepository.load(id);
    }
}

export default LoadTemplateByIdService;
