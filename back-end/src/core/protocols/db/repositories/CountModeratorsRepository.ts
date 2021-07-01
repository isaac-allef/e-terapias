export default interface countModeratorsRepository {
    count(offerId?: string): Promise<number>;
}
