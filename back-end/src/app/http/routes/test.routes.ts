import { Router, Request, Response } from 'express';

const sessionsRouter = Router();

sessionsRouter.post('/test', (_request: Request, response: Response) => {
    return response;
});

export default sessionsRouter;
