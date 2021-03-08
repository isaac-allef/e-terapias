// interface ICreateField {
//     name: string;
//     type: string;
//     value: string | number | Date | boolean;
// }

import IFieldJournal from '../models/IFieldJournal';

interface ICreateField {
    name: string;
    fieldJournal: IFieldJournal;
    string_value?: string;
    int_value?: number;
    date_value?: Date;
    boolean_value?: boolean;
}

export default ICreateField;
