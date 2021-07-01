export default interface CountEtherapiesRepository {
    count(offerId?: string): Promise<number>;
}
