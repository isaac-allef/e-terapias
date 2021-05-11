import Etherapy from '../../../entities/Etherapy';

export default interface LoadManyEtherapiesByIdentifierRepository {
    loadManyByIdentifiers(identifiers: string[]): Promise<Etherapy[]>;
}
