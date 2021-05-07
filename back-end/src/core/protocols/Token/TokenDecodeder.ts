export default interface TokenDecodeder {
    decode(token: string): Promise<string>;
}
