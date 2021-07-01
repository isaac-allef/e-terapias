export default interface countTemplatesRepository {
    count(offerId?: string): Promise<number>;
}
