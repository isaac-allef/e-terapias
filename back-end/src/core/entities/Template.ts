import Etherapy from './Etherapy';

export type templateField = {
    name: string;
};

interface FieldJournalTemplate {
    id: string;

    name: string;

    templateFields: templateField[];

    Etherapies: Etherapy[];
}

export default FieldJournalTemplate;
