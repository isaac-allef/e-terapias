// export interface TokenPayloadDTO {
//     iat: number;
//     exp: number;
//     sub: string;
// }

export interface VerifyTokenDTO {
    token: string;
    secret: string;
}

export default interface TokenVerifier {
    verify(data: VerifyTokenDTO): Promise<boolean>;
}
