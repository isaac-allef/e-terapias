/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
import TokenGenerater from '../../../src/core/protocols/Token/TokenGenerater';
import TokenDecodeder from '../../../src/core/protocols/Token/TokenDecodeder';

export class TokenGeneraterStub implements TokenGenerater {
    async generate(_value: string): Promise<string> {
        return new Promise(resolve => resolve('randomToken'));
    }
}

export class TokenDecodederStub implements TokenDecodeder {
    decode(_value: string): Promise<string> {
        return new Promise(resolve => resolve('decodedToken'));
    }
}
