import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/core/service/authentification/auth.service';
import { UserService } from 'src/app/core/service/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit {
  validateForm!: FormGroup
  isVisible = false

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.init()
  }

  logout() {
    this.authService.logout()
  }

  setPassword() {
    this.isVisible = true;
  }

  init() {
    this.validateForm = this.fb.group({
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    })
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

  submitForm(): void {
    if (this.validateForm.valid) {
      let request = { ...this.validateForm.value, username: this.authService.getUsername() }
      this.userService.updatePassword(request).subscribe(
        () => {
          this.message.success('Le mot de passe a été modifier avec succès')
          this.validateForm.reset()
          this.isVisible = false
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
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
