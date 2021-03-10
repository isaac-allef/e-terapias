import { Router } from 'express';
import ModeratorController from '../controllers/ModeratorController';
import RelationModeratorEterapiaController from '../controllers/RelationModeratorEterapiaController';

const moderatorsRoute = Router();
const moderatorController = new ModeratorController();
const relationModeratorEterapiaController = new RelationModeratorEterapiaController();

moderatorsRoute.post('/', moderatorController.create);

moderatorsRoute.get('/', moderatorController.list);

moderatorsRoute.get('/:id', moderatorController.show);

moderatorsRoute.put('/:id', moderatorController.update);

moderatorsRoute.delete('/:id', moderatorController.delete);

moderatorsRoute.patch(
    '/addEterapia',
    relationModeratorEterapiaController.create,
);

moderatorsRoute.patch(
    '/dropEterapia',
    relationModeratorEterapiaController.delete,
);

export default moderatorsRoute;
