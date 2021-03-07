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

    created_at: Date;

    update_at: Date;
}

export default IFieldJournalTemplate;
