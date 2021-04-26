import { Router, Request, Response } from 'express';

const testRouter = Router();

testRouter.get('/', (_request: Request, response: Response) => {
    return response.json({ message: 'Ok' });
});

export default testRouter;
