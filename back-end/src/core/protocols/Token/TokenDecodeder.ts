export default interface TokenDecodeder {
    decode(value: string): Promise<string>;
}
