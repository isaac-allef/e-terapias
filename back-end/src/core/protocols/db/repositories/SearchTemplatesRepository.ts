import Template from '../../../entities/Template';

export type params = {
    keywords: string;
    per_page: number;
    page: number;
};

export default interface SearchTemplatesRepository {
    search({ keywords, per_page, page }: params): Promise<Template[]>;
}
