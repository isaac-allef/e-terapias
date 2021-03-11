import IEterapia from '../../eterapias/models/IEterapia';

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

    eterapias: IEterapia[];

    created_at: Date;

    update_at: Date;
}

export default IFieldJournalTemplate;
