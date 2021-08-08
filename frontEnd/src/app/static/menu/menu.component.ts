import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/authentification/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: []
})
export class MenuComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  handle(selector, $event?) {
    switch (selector) {
      case "isHaveRole":
        this.authService.isHaveRole($event)
        break
    }
  }

}
