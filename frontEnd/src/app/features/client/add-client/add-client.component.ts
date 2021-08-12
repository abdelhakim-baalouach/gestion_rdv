import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Client } from 'src/app/core/model/client/client.model';
import { ClientService } from 'src/app/core/service/client/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: []
})
export class AddClientComponent implements OnInit {
  @Input() isAdd: boolean
  @Output() close = new EventEmitter<boolean>()

  validateForm!: FormGroup
  client: Client

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      nomContact: [null, [Validators.required]],
      chiffreAffaire: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
      adresse: [null, [Validators.required]],
    });
  }

  handle(selector, $event?) {
    switch (selector) {
      case 'submit':
        if (this.validateForm.valid) {
          this.client = { ...this.validateForm.value }
          this.clientService
            .add(this.client)
            .subscribe(
              () => {
                this.message.success('Le client a été créé avec succès')
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
