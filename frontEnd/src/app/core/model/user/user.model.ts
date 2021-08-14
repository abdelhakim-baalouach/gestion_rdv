export class User {
    id?: number
    fullName?: string
    username?: string
    password?: string
    state?: StateEnum
    roles?: Role[]
}

export class updateUserRequest {
    fullName?: string
    username?: string
    roles?: Role[]
}

export class Role {
    id?: number
    name?: string
}

export enum StateEnum {
    ACTIVE = "ACTIVE",
    DEACTIVE = "DEACTIVE",
    DELETED = "DELETED",
}

export class setState {
    id: number
    status: StateEnum
}