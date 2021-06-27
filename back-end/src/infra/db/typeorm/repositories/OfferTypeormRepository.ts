import { EntityRepository, getRepository, Repository } from 'typeorm';
import Offer from '../../../../core/entities/Offer';
import CreateOfferRepository, {
    params,
} from '../../../../core/protocols/db/repositories/CreateOfferRepository';
import LoadOfferByIdRepository from '../../../../core/protocols/db/repositories/LoadOfferByIdRepository';
import UpdateOfferRepository, {
    params as updateParams,
} from '../../../../core/protocols/db/repositories/UpdateOfferRepository';
import OfferTypeorm from '../entities/OfferTypeorm';

@EntityRepository()
class OfferTypeormRepository
    implements
        CreateOfferRepository,
        UpdateOfferRepository,
        LoadOfferByIdRepository {
    private ormRepository: Repository<OfferTypeorm>;

    constructor() {
        this.ormRepository = getRepository(OfferTypeorm);
    }

    public async create({
        name,
        dateStart,
        dateEnd,
        settings,
    }: params): Promise<Offer> {
        try {
            const offer = this.ormRepository.create({
                name,
                dateStart,
                dateEnd,
                settings,
            });

            await this.ormRepository.save(offer);

            return offer;
        } catch {
            throw new Error('Create offer error');
        }
    }

    public async update({
        id,
        name,
        dateStart,
        dateEnd,
        settings,
    }: updateParams): Promise<Offer> {
        try {
            const offer = await this.ormRepository.findOne({
                where: { id },
            });

            if (!offer) {
                throw new Error('Offer not found');
            }

            offer.name = name;
            offer.dateStart = dateStart;
            offer.dateEnd = dateEnd;
            offer.settings = settings;

            await this.ormRepository.save(offer);

            return offer;
        } catch (err) {
            throw new Error('Update offer error');
        }
    }

    public async load(id: string): Promise<Offer> {
        try {
            const offer = await this.ormRepository.findOne({
                where: { id },
                // relations: ['manager'],
            });

            if (!offer) {
                throw new Error('Offer not found');
            }

            return offer;
        } catch {
            throw new Error('Load offer error');
        }
    }
}

export default OfferTypeormRepository;
