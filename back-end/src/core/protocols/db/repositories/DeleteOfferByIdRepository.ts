export default interface DeleteOfferByIdRepository {
    delete(id: string): Promise<void>;
}
