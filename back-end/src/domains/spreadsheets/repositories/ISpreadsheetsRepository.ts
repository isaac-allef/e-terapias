type verifyColumnNameFunction = (column: string, value: string) => boolean;
type verifyColumnValueFunction = (value: string) => boolean;

export default interface ISpreadsheetsRepository {
    getPageRows(): Promise<unknown[]>;
    getPageRowsByColumn(
        columnName: string,
        verifyColumnName: verifyColumnNameFunction,
        verifyColumnValue: verifyColumnValueFunction,
    ): Promise<unknown[] | undefined>;
}
