// interface ICreateField {
//     name: string;
//     type: string;
//     value: string | number | Date | boolean;
// }

import FieldJournal from '../typeorm/entities/FieldJournal';

interface ICreateField {
    name: string;
    fieldJournal: FieldJournal;
    string_value?: string;
    int_value?: number;
    date_value?: Date;
    boolean_value?: boolean;
}

export default ICreateField;
