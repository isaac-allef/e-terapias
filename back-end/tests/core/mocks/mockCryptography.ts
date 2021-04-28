/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
import HashGenerater from '../../../src/core/protocols/cryptography/HashGenerater';

export class HashGeneraterStub implements HashGenerater {
    async generate(payload: string): Promise<string> {
        return new Promise(resolve => resolve(payload));
    }
}
