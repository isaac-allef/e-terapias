import IRequestField from '../dtos/IRequestField';
import ITemplateField from '../dtos/ITemplateField';

interface Request {
    fields: IRequestField[];
    fieldTemplates: ITemplateField[];
}

class FieldsMatchWithFieldTemplatesService {
    public execute({ fields, fieldTemplates }: Request): boolean {
        if (fields.length !== fieldTemplates.length) {
            return false;
        }

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].name !== fieldTemplates[i].name) {
                return false;
            }
            if (fields[i].type !== fieldTemplates[i].type) {
                return false;
            }
        }

        return true;
    }
}

export default FieldsMatchWithFieldTemplatesService;
