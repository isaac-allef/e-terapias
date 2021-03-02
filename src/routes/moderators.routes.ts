import { Router } from 'express';
import { getRepository } from 'typeorm';
import Eterapia from '../entities/Eterapia';
import Moderator from '../entities/Moderator';
import CreateModeratorService from '../services/CreateModeratorService';
import GetEterapiaByIdService from '../services/GetEterapiaByIdService';
import GetModeratorByIdService from '../services/GetModeratorByIdService';

const moderatorsRoute = Router();

moderatorsRoute.post('/', async (request, response) => {
    const { email, password } = request.body;

    const createModerator = new CreateModeratorService();

    const moderator = await createModerator.execute({
        email,
        password,
    });

    delete moderator.password;

    return response.json(moderator);
});

moderatorsRoute.get('/', (request, response) => {
    return response.json({ message: 'List' });
});

moderatorsRoute.put('/:id', async (request, response) => {
    const { id } = request.params;

    const { eterapiaId } = request.body;

    const moderatorRepository = getRepository(Moderator);

    const getModeratorById = new GetModeratorByIdService();
    const moderator = await getModeratorById.execute({
        moderatorId: id,
        moderatorRepository,
    });

    const eterapiaRepository = getRepository(Eterapia);

    const getEterapiaById = new GetEterapiaByIdService();
    const eterapia = await getEterapiaById.execute({
        eterapiaId,
        eterapiaRepository,
    });

    moderator.eterapias.push(eterapia);

    moderatorRepository.save(moderator);

    return response.json(moderator);
});

moderatorsRoute.delete('/', (request, response) => {
    return response.json({ message: 'Delete' });
});

moderatorsRoute.get('/:id', (request, response) => {
    const { id } = request.params;
    return response.json({ message: `Show: ${id}` });
});

export default moderatorsRoute;
