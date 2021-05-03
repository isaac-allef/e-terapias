import bcrypt from 'bcryptjs';
import HashComparer from '../../core/protocols/cryptography/HashComparer';
import HashGenerater from '../../core/protocols/cryptography/HashGenerater';

export default class BcryptAdapter implements HashGenerater, HashComparer {
    constructor(private readonly salt: number) {}

    async generate(payload: string): Promise<string> {
        const hash = await bcrypt.hash(payload, this.salt);
        return hash;
    }

    async compare(payload: string, hashed: string): Promise<boolean> {
        const isValid = await bcrypt.compare(payload, hashed);
        return isValid;
    }
}
