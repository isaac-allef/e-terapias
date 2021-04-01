import { sign, verify } from 'jsonwebtoken';
import IGenerateTokenDTO from '../dtos/IGenerateTokenDTO';
import IVerifyTokenDTO from '../dtos/IVerifyTokenDTO';
import ITokenPayloadDTO from '../dtos/ITokenPayloadDTO';
import ITokenProvider from '../models/ITokenProvider';

class JsonWebTokenProvider implements ITokenProvider {
    generateToken({ secret, subject, expiresIn }: IGenerateTokenDTO): string {
        const token = sign({}, secret, {
            subject,
            expiresIn,
        });

        return token;
    }

    verifyToken({ token, secret }: IVerifyTokenDTO): ITokenPayloadDTO | false {
        try {
            const decoded = verify(token, secret);
            return decoded as ITokenPayloadDTO;
        } catch {
            return false;
        }
    }
}

export default JsonWebTokenProvider;
