/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
import HashGenerater from '../../../src/core/protocols/cryptography/HashGenerater';
import HashComparer from '../../../src/core/protocols/cryptography/HashComparer';

export class HashGeneraterStub implements HashGenerater {
    async generate(payload: string): Promise<string> {
        return new Promise(resolve => resolve(payload));
    }
}

export class HashCompareStub implements HashComparer {
    async compare(_payload: string, _hashed: string): Promise<boolean> {
        return new Promise(resolve => resolve(true));
    }
}
