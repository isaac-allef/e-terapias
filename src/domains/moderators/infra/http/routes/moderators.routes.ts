import { Router } from 'express';
import ModeratorController from '../controllers/ModeratorController';

const moderatorsRoute = Router();
const moderatorController = new ModeratorController();

moderatorsRoute.post('/', moderatorController.create);

moderatorsRoute.get('/', moderatorController.list);

moderatorsRoute.get('/:id', moderatorController.show);

moderatorsRoute.put('/:id', moderatorController.update);

moderatorsRoute.delete('/:id', moderatorController.delete);

export default moderatorsRoute;
