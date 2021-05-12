export type params = {
    token: string;
    password: string;
};

export default interface ChangePasswordRepository {
    changePassword({ token, password }: params): Promise<boolean>;
}
