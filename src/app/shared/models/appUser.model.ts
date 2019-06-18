export enum UserRole {
    ADMIN = "admin",
    CLIENT = "user"
}

export class AppUserModel {
    email: string
    exp: number
    iat: number
    name: string
    role: UserRole
    surname: string
}