import Template, { templateField } from '../../../entities/Template';

export type params = {
    id: string;
    description: {
        name: string;
        templateFields: templateField[];
    };
};

export default interface UpdateTemplateRepository {
    update({ id, description }: params): Promise<Template>;
}
