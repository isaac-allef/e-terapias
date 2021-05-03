import jwt from 'jsonwebtoken';
import TokenGenerater from '../../core/protocols/Token/TokenGenerater';

export default class JwtAdapter implements TokenGenerater {
    constructor(private readonly secret: string) {}

    async generate(value: string): Promise<string> {
        await jwt.sign({ id: value }, this.secret);
        return '';
    }
}
