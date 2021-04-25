export default interface HashGenerater {
    generate(payload: string): Promise<string>;
}
