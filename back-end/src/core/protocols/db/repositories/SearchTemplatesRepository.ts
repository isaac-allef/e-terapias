import Template from '../../../entities/Template';

export default interface SearchTemplatesRepository {
    search(keywords: string): Promise<Template[]>;
}
