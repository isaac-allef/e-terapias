import DeleteEtherapyByIdRepository from '../protocols/db/repositories/DeleteEtherapyByIdRepository';

class DeleteEtherapyByIdService {
    constructor(
        private deleteEtherapyByIdRepository: DeleteEtherapyByIdRepository,
    ) {}

    public async execute(id: string): Promise<string> {
        await this.deleteEtherapyByIdRepository.delete(id);

        return 'Etherapy deleted';
    }
}

export default DeleteEtherapyByIdService;
