import Etherapy from '../../../entities/Etherapy';

export default interface CreateEtherapyRepository {
    create(name: string): Promise<Etherapy>;
}
