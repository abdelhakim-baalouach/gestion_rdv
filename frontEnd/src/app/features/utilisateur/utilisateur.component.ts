import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: []
})
export class UtilisateurComponent implements OnInit {
  isAdd: boolean = false
  eventsSubject: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
  }

  handle(selector, $event) {
    switch (selector) {
      case 'add':
        this.isAdd = $event
        if (!$event) this.emitEventToChild()
        break;
    }
  }

  emitEventToChild() {
    this.eventsSubject.next();
  }

}
