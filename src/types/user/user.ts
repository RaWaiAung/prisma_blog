export type signUpUser = {
    name: string;
    email: string;
    password: string;
}

export type LoginDto = {
    uniqueId: string;
    password: string;
    callback:Function;
}