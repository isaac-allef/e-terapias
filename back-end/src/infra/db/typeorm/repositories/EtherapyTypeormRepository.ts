/* eslint-disable no-restricted-syntax */
import { EntityRepository, getRepository, In, Repository } from 'typeorm';
import Etherapy from '../../../../core/entities/Etherapy';
import Template from '../../../../core/entities/Template';
import CreateEtherapiesRepository, {
    params as createParams,
} from '../../../../core/protocols/db/repositories/CreateEtherapiesRepository';
import LinkTemplateToEtherapiesRepository from '../../../../core/protocols/db/repositories/LinkTemplateToEtherapiesRepository';
import LoadAllEtherapiesRepository, {
    params,
} from '../../../../core/protocols/db/repositories/LoadAllEtherapiesRepository';
import LoadEtherapyByIdRepository from '../../../../core/protocols/db/repositories/LoadEtherapyByIdRepository';
import LoadEtherapyByIdentifierRepository from '../../../../core/protocols/db/repositories/LoadEtherapyByIdentifierRepository';
import LoadManyEtherapiesByIdentifierRepository from '../../../../core/protocols/db/repositories/LoadManyEtherapiesByIdentifierRepository';
import SearchEtherapiesRepository from '../../../../core/protocols/db/repositories/SearchEtherapiesRepository';
import EtherapyTypeorm from '../entities/EtherapyTypeorm';

@EntityRepository()
class EtherapyTypeormRepository
    implements
        CreateEtherapiesRepository,
        LoadEtherapyByIdRepository,
        LinkTemplateToEtherapiesRepository,
        LoadAllEtherapiesRepository,
        SearchEtherapiesRepository,
        LoadEtherapyByIdentifierRepository,
        LoadManyEtherapiesByIdentifierRepository {
    private ormRepository: Repository<EtherapyTypeorm>;

    constructor() {
        this.ormRepository = getRepository(EtherapyTypeorm);
    }

    public async create(data: createParams): Promise<Etherapy[]> {
        try {
            const etherapies = [];

            for (const dto of data) {
                // eslint-disable-next-line no-await-in-loop
                const etherapyExists = await this.ormRepository.findOne({
                    identifier: dto.identifier,
                });

                if (etherapyExists) {
                    etherapyExists.name = dto.name;
                    etherapies.push(etherapyExists);
                } else {
                    const etherapy = this.ormRepository.create({
                        identifier: dto.identifier,
                        name: dto.name,
                    });
                    etherapies.push(etherapy);
                }
            }

            await this.ormRepository.save(etherapies);

            return etherapies;
        } catch {
            throw new Error('Create etherapies error');
        }
    }

    async load(id: string): Promise<Etherapy> {
        try {
            const etherapy = await this.ormRepository.findOne({
                where: { id },
                relations: ['template', 'moderators'],
            });

            if (!etherapy) {
                throw new Error('Etherapy not found');
            }

            return etherapy;
        } catch {
            throw new Error('Load etherapy error');
        }
    }

    async linkTemplate(
        template: Template,
        etherapiesIds: string[],
        unlinkClean?: boolean,
    ): Promise<boolean> {
        try {
            if (unlinkClean) {
                await this.unlinkTemplate(template, etherapiesIds);
            }

            const etherapies = await this.ormRepository.find({
                id: In([...etherapiesIds]),
            });

            etherapies.forEach(etherapy => {
                // eslint-disable-next-line no-param-reassign
                etherapy.template = template;
            });

            await this.ormRepository.save(etherapies);

            return true;
        } catch (err) {
            throw new Error('Link template to etherapies error');
        }
    }

    private async unlinkTemplate(
        template: Template,
        etherapiesIdsKeepLinked: string[],
    ) {
        const etherapiesRelatedWithTheTemplate = await this.ormRepository.find({
            where: { template: { id: template.id } },
        });

        const etherapies = etherapiesRelatedWithTheTemplate.map(etherapy => {
            const templateMustBeUnlinkedFromEtherapy = !etherapiesIdsKeepLinked.includes(
                etherapy.id,
            );

            if (templateMustBeUnlinkedFromEtherapy) {
                // eslint-disable-next-line no-param-reassign
                etherapy.template = null;
            }

            return etherapy;
        });

        await this.ormRepository.save(etherapies);
    }

    async loadAll({
        sort,
        direction,
        per_page,
        page,
    }: params): Promise<Etherapy[]> {
        try {
            const etherapies = await this.ormRepository.find({
                order: { [sort]: direction.toUpperCase() },
                take: per_page,
                skip: (page - 1) * per_page,
                relations: ['template', 'moderators'],
            });

            return etherapies;
        } catch (err) {
            throw new Error('Load all etherapies error');
        }
    }

    async search(keywords: string): Promise<Etherapy[]> {
        try {
            const queryBuilder = this.ormRepository.createQueryBuilder(
                'Etherapy',
            );

            const finded = queryBuilder
                .leftJoinAndSelect('Etherapy.moderators', 'moderators')
                .leftJoinAndSelect('Etherapy.template', 'template')
                .where('Etherapy.name ILIKE :name', {
                    name: `%${keywords}%`,
                })
                .orWhere('Etherapy.identifier ILIKE :identifier', {
                    identifier: `%${keywords}%`,
                })
                .orWhere('moderators.name ILIKE :name', {
                    name: `%${keywords}%`,
                })
                .orWhere('moderators.email ILIKE :email', {
                    email: `%${keywords}%`,
                })
                .orWhere('template.name ILIKE :name', {
                    name: `%${keywords}%`,
                })
                .getMany();

            return finded;
        } catch {
            throw new Error('Search etherapies error');
        }
    }

    async loadByIdentifier(identifier: string): Promise<Etherapy> {
        try {
            const etherapy = await this.ormRepository.findOne({
                where: { identifier },
                relations: ['template', 'fieldJournals', 'moderators'],
            });

            if (!etherapy) {
                throw new Error('Etherapy not found');
            }

            return etherapy;
        } catch {
            throw new Error('Load etherapy error');
        }
    }

    async loadManyByIdentifiers(identifiers: string[]): Promise<Etherapy[]> {
        try {
            const etherapies = await this.ormRepository.find({
                identifier: In([...identifiers]),
            });

            return etherapies;
        } catch {
            throw new Error('Load many etherapies by identifiers error');
        }
    }
}

export default EtherapyTypeormRepository;
