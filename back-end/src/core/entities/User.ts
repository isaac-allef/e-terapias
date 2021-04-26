interface User {
    id: string;

    nickName: string;

    password: string;

    levelAccess: 'admin' | 'moderator';
}

export default User;
