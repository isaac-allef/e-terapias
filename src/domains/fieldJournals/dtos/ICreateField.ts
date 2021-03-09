// interface ICreateField {
//     name: string;
//     type: string;
//     value: string | number | Date | boolean;
// }

interface ICreateField {
    name: string;
    string_value?: string;
    int_value?: number;
    date_value?: Date;
    boolean_value?: boolean;
}

export default ICreateField;
