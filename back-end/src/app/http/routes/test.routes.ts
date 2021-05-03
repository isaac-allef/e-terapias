import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeTestContoller from '../../factories/makeTestContoller';

export default (router: Router): void => {
    router.get('/test/:id', adapterRouter(makeTestContoller()));
};
