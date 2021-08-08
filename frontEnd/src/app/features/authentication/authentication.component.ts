import { Component, OnInit } from '@angular/core';
import { Authentification } from 'src/app/core/model/_helper/_helper.model';
import { AuthService } from 'src/app/core/service/authentification/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  auth: Authentification

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  handle(selector) {
    switch (selector) {
      case 'login':
        this.auth = {
          username: "role_admin",
          password: "1234"
        }

        this.authService.loggedIn(this.auth)
        break

      default:
        break;
    }
  }

}
