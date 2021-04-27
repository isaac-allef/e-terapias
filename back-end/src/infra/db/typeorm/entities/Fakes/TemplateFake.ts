import Template, { templateField } from '../../../../../core/entities/Template';
import Etherapy from '../../../../../core/entities/Etherapy';
import generateFakeId from './generateFakeId';

class TemplateFake implements Template {
    constructor(name: string, templateFields: templateField[]) {
        this.id = generateFakeId();
        this.name = name;
        this.templateFields = templateFields;
    }

    id: string;

    name: string;

    templateFields: templateField[];

    Etherapies: Etherapy[];
}

export default TemplateFake;
