import Etherapy from '../../../entities/Etherapy';

export default interface LoadEtherapyByIdRepository {
    load(id: string): Promise<Etherapy>;
}
