import FieldJournal from './FieldJournal';

interface Field {
    id: number;

    question: string;

    string_value: string;

    int_value: number;

    date_value: Date;

    fieldJournal: FieldJournal;
}

export default Field;
