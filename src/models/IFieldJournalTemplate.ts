import Eterapia from './IEterapia';

interface FieldTemplates {
    name: string;
    type: string;
}

interface IFieldJournalTemplate {
    id: string;

    name: string;

    description: {
        title: string;
        fieldTemplates: FieldTemplates[];
    };

    eterapias: Eterapia[];
}

export default IFieldJournalTemplate;
