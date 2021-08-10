import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Client } from 'src/app/core/model/client/client.model';
import { ClientService } from 'src/app/core/service/client/client.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: []
})
export class UpdateClientComponent implements OnInit {
  @Input() client: Client
  @Input() isUpdate: boolean
  @Output() close = new EventEmitter<boolean>()

  validateForm!: FormGroup

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: [this.client.id, [Validators.required]],
      nomContact: [this.client.nomContact, [Validators.required]],
      chiffreAffaire: [this.client.chiffreAffaire, [Validators.required]],
      telephone: [this.client.telephone, [Validators.required]],
      adresse: [this.client.adresse, [Validators.required]],
    });
  }

  handle(selector, $event?) {
    switch (selector) {
      case 'submit':
        if (this.validateForm.valid) {
          this.client = { ...this.validateForm.value }
          this.clientService
            .update(this.client)
            .subscribe(
              () => {
                this.message.success('Le client a été modifié avec succès')
                this.validateForm.reset()
                this.handle('close')
              },
              (failed) => this.message.error(failed.error)
            )
        } else {
          this.handle('forItemsForm')
        }
        break

      case 'forItemsForm':
        for (const i in this.validateForm.controls) {
          if (this.validateForm.controls.hasOwnProperty(i)) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
          }
        }
        break

      case 'close':
        this.close.emit($event)
        break
    }
  }

}
