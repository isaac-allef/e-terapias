import AppError from '../errors/AppError';
import LinkTemplateToEtherapiesRepository from '../protocols/db/repositories/LinkTemplateToEtherapiesRepository';
import LoadEtherapyByIdRepository from '../protocols/db/repositories/LoadEtherapyByIdRepository';
import LoadTemplateByIdRepository from '../protocols/db/repositories/LoadTemplateByIdRepository';

class LinkTemplateToEtherapiesService {
    constructor(
        private linkTemplateToEtherapiesRepository: LinkTemplateToEtherapiesRepository,
        private loadEtherapyByIdRepository: LoadEtherapyByIdRepository,
        private loadTemplateByIdRepository: LoadTemplateByIdRepository,
    ) {}

    public async execute(
        templateId: string,
        etherapiesIds: string[],
    ): Promise<boolean> {
        const template = await this.loadTemplateByIdRepository.load(templateId);

        if (!template) {
            throw new AppError('Template not found.');
        }

        const etherapies = await Promise.all(
            etherapiesIds.map(async id => {
                const etherapy = await this.loadEtherapyByIdRepository.load(id);

                if (!etherapy) {
                    throw new AppError('Etherapy not found.');
                }

                return etherapy;
            }),
        );

        const isLinked = await this.linkTemplateToEtherapiesRepository.link(
            template,
            etherapies,
        );

        return isLinked;
    }
}

export default LinkTemplateToEtherapiesService;
