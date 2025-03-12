

export type CreateUser = {
    username: string,
    password: string,
}

export type UpdateUser = {
    id: number,
    username?: string,
    password?: string,
}