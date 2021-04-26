export default interface HashComparer {
    compare(payload: string, hashed: string): Promise<boolean>;
}
