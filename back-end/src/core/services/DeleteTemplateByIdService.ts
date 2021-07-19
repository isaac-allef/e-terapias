import DeleteTemplateByIdRepository from '../protocols/db/repositories/DeleteTemplateByIdRepository';

class DeleteTemplateByIdService {
    constructor(
        private deleteTemplateByIdRepository: DeleteTemplateByIdRepository,
    ) {}

    public async execute(id: string): Promise<string> {
        await this.deleteTemplateByIdRepository.delete(id);

        return 'Template deleted';
    }
}

export default DeleteTemplateByIdService;
