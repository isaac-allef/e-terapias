import jwt from 'jsonwebtoken';
import TokenDecodeder from '../../core/protocols/Token/TokenDecodeder';
import TokenGenerater from '../../core/protocols/Token/TokenGenerater';

export default class JwtAdapter implements TokenGenerater, TokenDecodeder {
    constructor(private readonly secret: string) {}

    async generate(value: string): Promise<string> {
        const accessToken = await jwt.sign({ id: value }, this.secret);
        return accessToken;
    }

    async decode(value: string): Promise<string> {
        await jwt.verify(value, this.secret);
        return '';
    }
}
