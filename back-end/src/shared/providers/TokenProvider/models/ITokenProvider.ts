import IGenerateTokenDTO from '../dtos/IGenerateTokenDTO';
import IVerifyTokenDTO from '../dtos/IVerifyTokenDTO';
import ITokenPayloadDTO from '../dtos/ITokenPayloadDTO';

export default interface ITokenProvider {
    generateToken(data: IGenerateTokenDTO): string;
    verifyToken(data: IVerifyTokenDTO): ITokenPayloadDTO | false;
}
