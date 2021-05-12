export type params = {
    id: string;
    password: string;
};

export default interface ChangePasswordModeratorRepository {
    changePassword({ id, password }: params): Promise<boolean>;
}
