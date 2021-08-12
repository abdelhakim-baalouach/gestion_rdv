import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TransferChange, TransferItem } from 'ng-zorro-antd/transfer';
import { UserService } from 'src/app/core/service/user/user.service';

@Component({
  selector: 'app-add-utilisateur',
  templateUrl: './add-utilisateur.component.html',
  styleUrls: ['./add-utilisateur.component.css']
})
export class AddUtilisateurComponent implements OnInit {
  @Input() isAdd: boolean
  @Output() close = new EventEmitter<boolean>()
  validateForm!: FormGroup
  list: TransferItem[] = []
  checkList: any[] = []
  isCheckUsername: number = 0

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.init()
  }

  isClose($event) {
    this.close.emit($event)
    this.checkList = []
  }

  submitForm(): void {
    if (this.checkList.length !== 0) {
      if (this.validateForm.valid) {
        let request = { ...this.validateForm.value, roles: this.checkList }
        this.userService.saveUser(request).subscribe(
          () => {
            this.message.success('L\'utilisateur a été créé avec succès')
            this.validateForm.reset()
            this.isClose(false)
          },
          (failed) => this.message.error(failed.error)
        )
      } else {
        for (const i in this.validateForm.controls) {
          if (this.validateForm.controls.hasOwnProperty(i)) {
            this.validateForm.controls[i].markAsDirty()
            this.validateForm.controls[i].updateValueAndValidity()
          }
        }
      }
    } else {
      this.message.warning('Veuillez affecter au moins un droit d\'accès')
    }
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity())
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true }
    }
    return {}
  }

  init() {
    this.validateForm = this.fb.group({
      fullName: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    })
    this.userService.initRoles().map(
      (item) => this.list.push({
        key: item.role,
        title: item.text,
        description: item.text,
      })
    )
  }

  filterOption(inputValue: string, item: any): boolean {
    return item.description.indexOf(inputValue) > -1
  }

  change(ret: TransferChange): void {
    if (ret.to === 'right') {
      ret.list.map((item) => this.checkList.push(item.key))
    } else {
      ret.list.map(
        (item) => {
          const index = this.checkList.indexOf(item.key, 0)
          if (index > -1) { this.checkList.splice(index, 1) }
        }
      )
    }
  }

  checkUsername($event: string) {
    this.userService
      .getWithQuery({ q: $event })
      .subscribe(
        (success) => {
          if (success.length === 0) {
            this.isCheckUsername = 1
          } else {
            this.isCheckUsername = 2
          }
        },
        (failed) => this.message.error(failed.error)
      )
  }
}
