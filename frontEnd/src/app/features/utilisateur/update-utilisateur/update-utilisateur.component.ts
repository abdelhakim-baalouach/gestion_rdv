import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TransferChange, TransferItem } from 'ng-zorro-antd/transfer';
import { User } from 'src/app/core/model/user/user.model';
import { UserService } from 'src/app/core/service/user/user.service';

@Component({
  selector: 'app-update-utilisateur',
  templateUrl: './update-utilisateur.component.html',
  styleUrls: []
})
export class UpdateUtilisateurComponent implements OnInit {
  @Input() user: User
  @Input() isUpdate: boolean
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
        let request = { ...this.validateForm.value, roles: this.checkList, username: this.user.username }
        console.log(request)

        this.userService.update(request).subscribe(
          () => {
            this.message.success('L\'utilisateur a été modifie avec succès')
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

  init() {
    this.validateForm = this.fb.group({
      fullName: [this.user.fullName, [Validators.required]],
      username: [{ value: this.user.username, disabled: true }],
    })
    this.userService.initRoles().map(
      (item) => this.list.push({
        key: item.role,
        title: item.text,
        description: item.text,
      })
    )
    this.user.roles.forEach(role => {
      const index = this.list.findIndex(item => item.key === role.name)
      this.list[index].direction = 'right'
      this.checkList.push(role.name)
    })
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
