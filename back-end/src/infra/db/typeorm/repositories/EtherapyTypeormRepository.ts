/* eslint-disable no-restricted-syntax */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Etherapy from '../../../../core/entities/Etherapy';
import Template from '../../../../core/entities/Template';
import CreateEtherapiesRepository, {
    params as createParams,
} from '../../../../core/protocols/db/repositories/CreateEtherapiesRepository';
import LinkModeratorsToEtherapiesRepository, {
    params as linkParams,
} from '../../../../core/protocols/db/repositories/LinkModeratorsToEtherapiesRepository';
import LinkTemplateToEtherapiesRepository from '../../../../core/protocols/db/repositories/LinkTemplateToEtherapiesRepository';
import LoadAllEtherapiesRepository, {
    params,
} from '../../../../core/protocols/db/repositories/LoadAllEtherapiesRepository';
import LoadEtherapyByIdRepository from '../../../../core/protocols/db/repositories/LoadEtherapyByIdRepository';
import SearchEtherapiesRepository from '../../../../core/protocols/db/repositories/SearchEtherapiesRepository';
import EtherapyTypeorm from '../entities/EtherapyTypeorm';

@EntityRepository()
class EtherapyTypeormRepository
    implements
        CreateEtherapiesRepository,
        LoadEtherapyByIdRepository,
        LinkModeratorsToEtherapiesRepository,
        LinkTemplateToEtherapiesRepository,
        LoadAllEtherapiesRepository,
        SearchEtherapiesRepository {
    private ormRepository: Repository<EtherapyTypeorm>;

    constructor() {
        this.ormRepository = getRepository(EtherapyTypeorm);
    }

    public async create(data: createParams): Promise<Etherapy[]> {
        try {
            const etherapies = [];

            for (const dto of data) {
                const etherapy = this.ormRepository.create({ name: dto.name });
                etherapies.push(etherapy);
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

    async link(data: linkParams): Promise<boolean> {
        try {
            const etherapies = await Promise.all(
                data.map(async d => {
                    if (!d.etherapy.moderators) {
                        // eslint-disable-next-line no-param-reassign
                        d.etherapy.moderators = [];
                    }
                    d.etherapy.moderators.push(d.moderator);
                    return d.etherapy;
                }),
            );

            await this.ormRepository.save(etherapies);

            return true;
        } catch (err) {
            throw new Error('Link moderators to etherapies error');
        }
    }

    async linkTemplate(
        template: Template,
        etherapies: Etherapy[],
    ): Promise<boolean> {
        try {
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
                relations: ['template', 'fieldJournals', 'moderators'],
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
                .leftJoinAndSelect('Etherapy.fieldJournals', 'fieldJournals')
                .where('Etherapy.name ILIKE :name', {
                    name: `%${keywords}%`,
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
                .orWhere('fieldJournals.name ILIKE :name', {
                    name: `%${keywords}%`,
                })
                .getMany();

            return finded;
        } catch {
            throw new Error('Search etherapies error');
        }
    }
}

export default EtherapyTypeormRepository;
