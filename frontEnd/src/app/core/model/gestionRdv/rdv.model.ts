import { AppConfig } from "../appConfig/appConfig.model"
import { Client } from "../client/client.model"
import { StateEnum } from "../user/user.model"

export class GestionRdv {
    id?: number
    fullName: string
    telephone: string
    dateRdv: Date
    raison: string
    typeAdequatRDV: TypeAdequatRDV
    natureContact: NatureContact
    state?: StateEnum = StateEnum.ACTIVE
    client: Client
    canal: AppConfig
    type_rdv: AppConfig
    secteur: AppConfig
    isChecked?: boolean = true
}

export enum TypeAdequatRDV {
    PROSPECT = "PROSPECT,",
    ASSURE = "ASSURE"
}

export enum NatureContact {
    VISITE = "VISITE,",
    TELECONFERENCE = "TELECONFERENCE"
}