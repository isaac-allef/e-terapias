import Etherapy from '../../../entities/Etherapy';

export default interface LoadEtherapyByIdRepository {
    loadByIdentifier(identifier: string): Promise<Etherapy>;
}
