import Template from '../../../entities/Template';

export default interface LoadTemplateByIdRepository {
    load(id: string): Promise<Template>;
}
