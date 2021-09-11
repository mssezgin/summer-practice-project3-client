export interface Message {
    _id: string;
    when: Date;
    updatedAt: Date;
    seen: boolean;
    from: {
        userId: string,
        username: string,
        deletedThis: boolean
    };
    to: {
        userId: string,
        username: string,
        deletedThis: boolean
    };
    subject?: string;
    body?: string;
}
