interface Field_request {
    name: string;
    type: string;
    value: string | number | Date | boolean;
}

interface FieldTemplates {
    name: string;
    type: string;
}

interface Request {
    fields: Field_request[];
    fieldTemplates: FieldTemplates[];
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
