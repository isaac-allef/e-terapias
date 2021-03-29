import ICreateEterapiaDTO from '../dtos/ICreateEterapiaDTO';
import IEterapia from '../models/IEterapia';
import IEterapiaRepository from '../repositories/IEterapiaRepository';

class CreateEterapiaService {
    constructor(private eterapiaRepository: IEterapiaRepository) {}

    public async execute({ name }: ICreateEterapiaDTO): Promise<IEterapia> {
        const eterapia = await this.eterapiaRepository.create({
            name,
        });

        return eterapia;
    }
}

export default CreateEterapiaService;
