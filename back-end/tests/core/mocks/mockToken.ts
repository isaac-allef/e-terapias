/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
import TokenGenerater from '../../../src/core/protocols/Token/TokenGenerater';
import TokenVerifier, {
    VerifyTokenDTO,
} from '../../../src/core/protocols/Token/TokenVerifier';

export class TokenGeneraterStub implements TokenGenerater {
    async generate(_value: string): Promise<string> {
        return new Promise(resolve => resolve('randomToken'));
    }
}

export class TokenVerifierStub implements TokenVerifier {
    verify(_data: VerifyTokenDTO): Promise<boolean> {
        return new Promise(resolve => resolve(true));
    }
}
