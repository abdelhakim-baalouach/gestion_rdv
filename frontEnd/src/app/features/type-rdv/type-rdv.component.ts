import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TypeEnum } from 'src/app/core/model/appConfig/appConfig.model';
import { AppConfigRole } from 'src/app/core/model/_helper/_helper.model';

@Component({
  selector: 'app-type-rdv',
  templateUrl: './type-rdv.component.html',
  styleUrls: []
})
export class TypeRdvComponent implements OnInit {
  isAdd: boolean = false
  typeEnum: TypeEnum
  roles: AppConfigRole

  eventsSubject: Subject<void> = new Subject<void>()

  constructor() {
    this.typeEnum = TypeEnum.TYPE_RDV
    this.roles = {
      update: "ROLE_TYPE_RDV_UPDATE",
      delete: "ROLE_TYPE_RDV_DELETE"
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
