import { Router, Request, Response } from 'express';

const testRouter = Router();

testRouter.get('/', async (_request: Request, response: Response) => {
    return response.json({ message: 'test route' });
});

export default testRouter;
