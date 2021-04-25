import RequestField from './dtos/RequestFieldDTO';
import TemplateField from './dtos/TemplateFieldDTO';

interface Request {
    fields: RequestField[];
    fieldTemplates: TemplateField[];
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
