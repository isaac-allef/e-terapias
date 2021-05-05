import Etherapy from '../../../entities/Etherapy';

export default interface SearchEtherapiesRepository {
    search(keywords: string): Promise<Etherapy[]>;
}
