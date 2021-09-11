export interface User {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    admin: boolean;
    email: string;
    username: string;
    password: string;
    firstname?: string;
    lastname?: string;
    gender?: string;
    birth?: Date;
}
