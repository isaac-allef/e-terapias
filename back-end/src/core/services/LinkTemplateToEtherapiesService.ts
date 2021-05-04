import LinkTemplateToEtherapiesRepository from '../protocols/db/repositories/LinkTemplateToEtherapiesRepository';
import LoadEtherapyByIdRepository from '../protocols/db/repositories/LoadEtherapyByIdRepository';
import LoadTemplateByIdRepository from '../protocols/db/repositories/LoadTemplateByIdRepository';

class LinkTemplateToEtherapiesService {
    constructor(
        private linkTemplateToEtherapiesRepository: LinkTemplateToEtherapiesRepository,
        private loadTemplateByIdRepository: LoadTemplateByIdRepository,
        private loadEtherapyByIdRepository: LoadEtherapyByIdRepository,
    ) {}

    public async execute(
        templateId: string,
        etherapiesIds: string[],
    ): Promise<boolean> {
        const template = await this.loadTemplateByIdRepository.load(templateId);

        const etherapies = await Promise.all(
            etherapiesIds.map(async id => {
                const etherapy = await this.loadEtherapyByIdRepository.load(id);

                return etherapy;
            }),
        );

        const isLinked = await this.linkTemplateToEtherapiesRepository.linkTemplate(
            template,
            etherapies,
        );

        return isLinked;
    }
}

export default LinkTemplateToEtherapiesService;
