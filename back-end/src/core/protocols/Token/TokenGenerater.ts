export default interface TokenGenerater {
    generate(value: string): Promise<string>;
}
