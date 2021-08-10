import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { AuthService } from './core/service/authentification/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  href: String = ""
  load: boolean = false

  constructor(
    private authService: AuthService,
    private cdref: ChangeDetectorRef
  ) {
  }

  ngAfterContentChecked() {
    this.load = this.authService.isLoggedIn()
    this.cdref.detectChanges()
  }

  ngOnInit() {
    /*this.router.events
      .subscribe(
        (event: NavigationEvent) => {
          if (event instanceof NavigationStart) {
            this.href = event.url
            console.log(this.href);
          }
        });*/
  }

  isLoading(): boolean {
    return this.load
  }
}
