import { StateEnum } from "../user/user.model"

export class AppConfig {
    id?: number
    nom?: string
    typeEnum?: TypeEnum
    state?: StateEnum.ACTIVE
}

export enum TypeEnum {
    CANAL = "CANAL",
    TYPE_RDV = "TYPE_RDV",
    SECTEUR = "SECTEUR"
}