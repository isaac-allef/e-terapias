import { EntityRepository, getRepository, Repository } from 'typeorm';
import Offer from '../../../../core/entities/Offer';
import CreateOfferRepository, {
    params,
} from '../../../../core/protocols/db/repositories/CreateOfferRepository';
import DeleteOfferByIdRepository from '../../../../core/protocols/db/repositories/DeleteOfferByIdRepository';
import LoadAllOffersRepository, {
    params as loadAllParams,
} from '../../../../core/protocols/db/repositories/LoadAllOffersRepository';
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
        LoadOfferByIdRepository,
        LoadAllOffersRepository,
        DeleteOfferByIdRepository {
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
            });

            if (!offer) {
                throw new Error('Offer not found');
            }

            return offer;
        } catch {
            throw new Error('Load offer error');
        }
    }

    public async loadAll({
        sort,
        direction,
        per_page,
        page,
    }: loadAllParams): Promise<Offer[]> {
        try {
            const offers = await this.ormRepository.find({
                order: { [sort]: direction.toUpperCase() },
                take: per_page,
                skip: (page - 1) * per_page,
                relations: ['etherapies'],
            });

            return offers;
        } catch (err) {
            throw new Error('Load all offers error');
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.ormRepository.softDelete(id);
        } catch (err) {
            throw new Error('Delete offer error.');
        }
    }
}

export default OfferTypeormRepository;
