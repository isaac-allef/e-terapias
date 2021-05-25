import Etherapy from '../../../entities/Etherapy';

export type params = {
    keywords: string;
    per_page: number;
    page: number;
};

export default interface SearchEtherapiesRepository {
    search({ keywords, per_page, page }: params): Promise<Etherapy[]>;
}
