type likeFunction = (column: string, value: string) => boolean;
type verifyFunction = (value: string) => boolean;

export default interface ISpreadsheetsRepository {
    getPageRows(): Promise<unknown[]>;
    getPageRowsByColumn(
        columnName: string,
        like: likeFunction,
        verify: verifyFunction,
    ): Promise<unknown[] | undefined>;
}
