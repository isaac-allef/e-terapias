import ICreateField from '../dtos/ICreateField';
import IField from '../models/IField';

export default interface IFieldRepository {
    createWithoutSave(data: ICreateField): IField;
    saveArray(field: IField[]): Promise<void>;
}
