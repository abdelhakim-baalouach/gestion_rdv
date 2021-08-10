import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Authentification } from 'src/app/core/model/_helper/_helper.model';
import { AuthService } from 'src/app/core/service/authentification/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  auth: Authentification
  validateForm!: FormGroup

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['gestion-rdv'])
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  handle(selector) {
    switch (selector) {
      case 'login':
        if (this.validateForm.valid) {
          this.auth = { ...this.validateForm.value }
          this.authService.loggedIn(this.auth)
        } else {
          for (const i in this.validateForm.controls) {
            if (this.validateForm.controls.hasOwnProperty(i)) {
              this.validateForm.controls[i].markAsDirty();
              this.validateForm.controls[i].updateValueAndValidity();
            }
          }
        }
        break
    }
  }
}
