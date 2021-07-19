export default interface DeleteTemplateByIdRepository {
    delete(id: string): Promise<void>;
}
