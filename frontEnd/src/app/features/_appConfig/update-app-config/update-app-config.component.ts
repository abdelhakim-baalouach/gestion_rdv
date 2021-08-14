import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppConfig, TypeEnum } from 'src/app/core/model/appConfig/appConfig.model';
import { AppConfigService } from 'src/app/core/service/appConfig/app-config.service';

@Component({
  selector: 'app-update-app-config',
  templateUrl: './update-app-config.component.html',
  styleUrls: []
})
export class UpdateAppConfigComponent implements OnInit {
  @Input() isUpdate: boolean
  @Input() appConfig: AppConfig
  @Input() title: string
  @Output() close = new EventEmitter<boolean>()

  validateForm!: FormGroup
  isConfirmLoading: boolean = false

  constructor(
    private appConfigService: AppConfigService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      nom: [this.appConfig.nom, [Validators.required]],
    })
  }

  handle(selector, $event?) {
    switch (selector) {
      case 'submit':
        this.isConfirmLoading = true
        if (this.validateForm.valid) {
          this.appConfig = { ...this.appConfig, ...this.validateForm.value }
          this.appConfigService
            .update(this.appConfig)
            .subscribe(
              () => {
                this.message.success('La modification a été effectuée avec succès')
                this.validateForm.get("nom").reset()
                this.isConfirmLoading = false
                this.handle('close')
              },
              (failed) => this.message.error(failed.error)
            )
        } else {
          this.handle('forItemsForm')
          this.isConfirmLoading = false
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
