export interface GenerateTokenDTO {
    secret: string;
    subject: string;
    expiresIn: string;
}

export default interface TokenGenerater {
    generate(data: GenerateTokenDTO): Promise<string>;
}
