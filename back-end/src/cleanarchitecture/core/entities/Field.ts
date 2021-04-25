import FieldJournal from './FieldJournal';

interface Field {
    id: number;

    name: string;

    string_value: string;

    int_value: number;

    date_value: Date;

    boolean_value: boolean;

    fieldJournal: FieldJournal;

    created_at: Date;

    update_at: Date;
}

export default Field;
