export type signUpUser = {
    name: string;
    email: string;
    password: string;
    role: any;
}

export type LoginDto = {
    uniqueId: string;
    password: string;
    callback:Function;
}