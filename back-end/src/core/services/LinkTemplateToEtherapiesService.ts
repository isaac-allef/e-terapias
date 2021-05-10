import LinkTemplateToEtherapiesRepository from '../protocols/db/repositories/LinkTemplateToEtherapiesRepository';
import LoadTemplateByIdRepository from '../protocols/db/repositories/LoadTemplateByIdRepository';

class LinkTemplateToEtherapiesService {
    constructor(
        private linkTemplateToEtherapiesRepository: LinkTemplateToEtherapiesRepository,
        private loadTemplateByIdRepository: LoadTemplateByIdRepository,
    ) {}

    public async execute(
        templateId: string,
        etherapiesIds: string[],
    ): Promise<boolean> {
        const template = await this.loadTemplateByIdRepository.load(templateId);

        const isLinked = await this.linkTemplateToEtherapiesRepository.linkTemplate(
            template,
            etherapiesIds,
        );

        return isLinked;
    }
}

export default LinkTemplateToEtherapiesService;
