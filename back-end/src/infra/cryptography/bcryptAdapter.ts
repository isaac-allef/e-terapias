import bcrypt from 'bcryptjs';
import HashGenerater from '../../core/protocols/cryptography/HashGenerater';

export default class BcryptAdapter implements HashGenerater {
    constructor(private readonly salt: number) {}

    async generate(payload: string): Promise<string> {
        await bcrypt.hash(payload, this.salt);
        return '';
    }
}
