import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/authentification/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: []
})
export class MenuComponent implements OnInit {
  isHasConfig: boolean = false

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  isHavePermission($event): boolean {
    const isTrue = this.authService.isHaveRole($event)
    if (isTrue) this.isHasConfig = true
    return isTrue
  }

}
