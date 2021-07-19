export default interface DeleteEtherapyByIdRepository {
    delete(id: string): Promise<void>;
}
