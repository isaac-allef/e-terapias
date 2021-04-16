type verifyFunction = (value: string) => boolean;

export default interface IParticipantsSheetInformationRepository {
    getJSON(): Promise<JSON>;
    getByColumnJSON(
        columnName: string,
        verify: verifyFunction,
    ): Promise<JSON | false>;
}
