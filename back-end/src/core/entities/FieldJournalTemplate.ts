import Etherapy from './Etherapy';

interface FieldTemplates {
    name: string;
    type: string;
}

interface FieldJournalTemplate {
    id: string;

    name: string;

    description: {
        title: string;
        fieldTemplates: FieldTemplates[];
    };

    Etherapies: Etherapy[];
}

export default FieldJournalTemplate;
