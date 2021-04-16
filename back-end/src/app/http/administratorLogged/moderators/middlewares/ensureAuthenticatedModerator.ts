import { Request, Response, NextFunction } from 'express';
import authConfig from '../../../../../config/auth';
import AppError from '../../../../../shared/errors/AppError';
import JsonWebTokenProvider from '../../../../../shared/providers/TokenProvider/implementations/JsonWebTokenProvider';

export default function ensureAuthenticatedModerator(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    const tokenProvider = new JsonWebTokenProvider();
    const decoded = tokenProvider.verifyToken({
        token,
        secret: authConfig.jwtModerator.secret,
    });

    if (!decoded) {
        throw new AppError('Invalid JWT token', 401);
    }

    const { sub } = decoded;

    request.moderator = {
        id: sub,
    };

    return next();
}
