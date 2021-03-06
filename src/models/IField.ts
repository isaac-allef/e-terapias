import FieldJournal from './IFieldJournal';

interface IField {
    id: number;

    name: string;

    string_value: string;

    int_value: number;

    date_value: Date;

    boolean_value: boolean;

    fieldJournal: FieldJournal;
}

export default IField;
