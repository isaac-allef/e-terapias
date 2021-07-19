export default interface DeleteModeratorByIdRepository {
    delete(id: string): Promise<void>;
}
