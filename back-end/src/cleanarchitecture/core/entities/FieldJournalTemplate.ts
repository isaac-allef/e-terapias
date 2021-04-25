import Eterapia from './Eterapia';

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

    eterapias: Eterapia[];

    created_at: Date;

    update_at: Date;
}

export default FieldJournalTemplate;
