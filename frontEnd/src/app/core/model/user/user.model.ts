export class User {
    id?: number
    fullName?: string
    username?: string
    password?: string
    state?: StateEnum
    roles?: Role[]
}

export class Role {
    id?: number
    name?: string
}

enum StateEnum {
    ACTIVE = "ACTIVE",
    DEACTIVE = "DEACTIVE",
}

export class setState {
    id: number
    status: StateEnum
}