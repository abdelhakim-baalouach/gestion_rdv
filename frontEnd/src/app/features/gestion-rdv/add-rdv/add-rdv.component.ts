import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppConfig, TypeEnum } from 'src/app/core/model/appConfig/appConfig.model';
import { Client } from 'src/app/core/model/client/client.model';
import { GestionRdv } from 'src/app/core/model/gestionRdv/rdv.model';
import { AppConfigService } from 'src/app/core/service/appConfig/app-config.service';
import { ClientService } from 'src/app/core/service/client/client.service';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { DisabledTimeFn } from 'ng-zorro-antd/date-picker';
import { RdvService } from 'src/app/core/service/gestionRdv/rdv.service';

@Component({
  selector: 'app-add-rdv',
  templateUrl: './add-rdv.component.html',
  styleUrls: []
})
export class AddRdvComponent implements OnInit {
  @Input() isAdd: boolean
  @Input() date: Date
  @Output() close = new EventEmitter<boolean>()

  disabledDate = (current: Date): boolean => differenceInCalendarDays(current, new Date()) < 0

  gestionRdv: GestionRdv
  validateForm!: FormGroup
  getionRdv: GestionRdv
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
      fullName: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
      dateRdv: [null, [Validators.required]],
      raison: [null, [Validators.maxLength(254)]],
      typeAdequatRDV: ["PROSPECT", [Validators.required]],
      natureContact: ["VISITE", [Validators.required]],
      client: [null, [Validators.required]],
      canal: [null, [Validators.required]],
      type_rdv: [null, [Validators.required]],
      secteur: [null, [Validators.required]],
    })
    this.handle('init')
  }

  handle(selector, $event?, TYPE?) {
    switch (selector) {
      case 'submit':
        if (this.validateForm.valid) {
          this.gestionRdv = { ...this.validateForm.value }
          this.rdvService
            .add(this.gestionRdv)
            .subscribe(
              () => {
                this.message.success('Le RDV a été créé avec succès')
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
