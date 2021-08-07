import { Component } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  href: String = ""
  load: boolean = true

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events
      .subscribe(
        (event: NavigationEvent) => {
          if (event instanceof NavigationStart) {
            this.href = event.url
            console.log(this.href);

          }
        });
  }
}
