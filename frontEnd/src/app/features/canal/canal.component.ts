import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TypeEnum } from 'src/app/core/model/appConfig/appConfig.model';
import { AppConfigRole } from 'src/app/core/model/_helper/_helper.model';

@Component({
  selector: 'app-canal',
  templateUrl: './canal.component.html',
  styleUrls: []
})
export class CanalComponent implements OnInit {
  isAdd: boolean = false
  typeEnum: TypeEnum
  roles: AppConfigRole

  eventsSubject: Subject<void> = new Subject<void>()

  constructor() {
    this.typeEnum = TypeEnum.CANAL
    this.roles = {
      update: "ROLE_CANAL_UPDATE",
      delete: "ROLE_CANAL_DELETE"
    }
  }

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
