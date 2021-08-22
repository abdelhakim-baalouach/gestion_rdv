import { Component, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './core/service/authentification/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  href: String = ""
  load: boolean = false
  userActivity
  userInactive: Subject<any> = new Subject()

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.setTimeout()
    this.userInactive.subscribe(() => {
      if (localStorage.getItem('token')) {
        this.authService.logout()
      } else {
        this.setTimeout()
      }
    })

  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 3 * 60 * 1000)
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity)
    this.setTimeout()
  }

  isLoading(): boolean {
    return this.authService.isLoggedIn()
  }
}
