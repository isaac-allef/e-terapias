import DeleteModeratorByIdRepository from '../protocols/db/repositories/DeleteModeratorByIdRepository';

class DeleteModeratorByIdService {
    constructor(
        private deleteModeratorByIdRepository: DeleteModeratorByIdRepository,
    ) {}

    public async execute(id: string): Promise<string> {
        await this.deleteModeratorByIdRepository.delete(id);

        return 'Moderator deleted';
    }
}

export default DeleteModeratorByIdService;
