declare namespace Express {
    export interface Request {
        administrator: {
            id: string;
        };
        moderator: {
            id: string;
        };
    }
}
