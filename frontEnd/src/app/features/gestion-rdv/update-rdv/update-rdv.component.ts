import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppConfig, TypeEnum } from 'src/app/core/model/appConfig/appConfig.model';
import { Client } from 'src/app/core/model/client/client.model';
import { GestionRdv } from 'src/app/core/model/gestionRdv/rdv.model';
import { AppConfigService } from 'src/app/core/service/appConfig/app-config.service';
import { ClientService } from 'src/app/core/service/client/client.service';
import { RdvService } from 'src/app/core/service/gestionRdv/rdv.service';
import { differenceInCalendarDays } from 'date-fns';

@Component({
  selector: 'app-update-rdv',
  templateUrl: './update-rdv.component.html',
  styleUrls: []
})
export class UpdateRdvComponent implements OnInit {
  @Input() isUpdate: boolean
  @Input() gestionRdv: GestionRdv
  @Output() close = new EventEmitter<boolean>()

  disabledDate = (current: Date): boolean => differenceInCalendarDays(current, new Date()) < 0

  validateForm!: FormGroup
  secteurs: AppConfig[]
  canals: AppConfig[]
  typeRdvs: AppConfig[]
  clients: Client[]

  constructor(
    private appConfigService: AppConfigService,
    private clientService: ClientService,
    private rdvService: RdvService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: [this.gestionRdv.id, []],
      fullName: [this.gestionRdv.fullName, [Validators.required]],
      telephone: [this.gestionRdv.telephone, [Validators.required]],
      dateRdv: [this.gestionRdv.dateRdv, [Validators.required]],
      raison: [this.gestionRdv.raison, [Validators.maxLength(254)]],
      typeAdequatRDV: [this.gestionRdv.typeAdequatRDV, [Validators.required]],
      natureContact: [this.gestionRdv.natureContact, [Validators.required]],
      client: [this.gestionRdv.client, [Validators.required]],
      canal: [this.gestionRdv.canal, [Validators.required]],
      type_rdv: [this.gestionRdv.type_rdv, [Validators.required]],
      secteur: [this.gestionRdv.secteur, [Validators.required]],
    })
    this.handle('init')
  }

  handle(selector, $event?, TYPE?) {
    switch (selector) {
      case 'submit':
        if (this.validateForm.valid) {
          this.gestionRdv = { ...this.validateForm.value }
          console.log(this.gestionRdv)

          this.rdvService
            .update(this.gestionRdv)
            .subscribe(
              () => {
                this.message.success('Le RDV a été modifier avec succès')
                this.handle('close')
              },
              failed => this.message.error(failed.status)
            )
        } else {
          for (const i in this.validateForm.controls) {
            if (this.validateForm.controls.hasOwnProperty(i)) {
              this.validateForm.controls[i].markAsDirty();
              this.validateForm.controls[i].updateValueAndValidity();
            }
          }
        }
        break

      case 'SECTEUR':
        this.appConfigService
          .getWithQuery({ typeEnum: TypeEnum.SECTEUR, nom: $event })
          .subscribe(
            success => this.secteurs = success,
            failed => this.message.error(failed.status)
          )
        break

      case 'CANAL':
        this.appConfigService
          .getWithQuery({ typeEnum: TypeEnum.CANAL, nom: $event })
          .subscribe(
            success => this.canals = success,
            failed => this.message.error(failed.status)
          )
        break
      case 'TYPE_RDV':
        this.appConfigService
          .getWithQuery({ typeEnum: TypeEnum.TYPE_RDV, nom: $event })
          .subscribe(
            success => this.typeRdvs = success,
            failed => this.message.error(failed.status)
          )
        break
      case 'SOCIETE':
        this.clientService
          .getWithQuery({ nomContact: $event })
          .subscribe(
            success => this.clients = success,
            failed => this.message.error(failed.status)
          )
        break

      case 'init':
        this.handle('SECTEUR')
        this.handle('CANAL')
        this.handle('TYPE_RDV')
        this.handle('SOCIETE')
        break

      case 'close':
        this.close.emit($event)
        break
    }
  }
}
