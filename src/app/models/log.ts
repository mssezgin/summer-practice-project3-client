export interface Log {
    _id: string;
    when: Date;
    action: string;
    success: boolean;
    resultMessage: string;
    actor: {
        userId: string,
        username: string,
        email: string
    };
    ip: string;
    browser: string;
}
