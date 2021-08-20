import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GestionRdv } from 'src/app/core/model/gestionRdv/rdv.model';
import { AuthService } from 'src/app/core/service/authentification/auth.service';
import { RdvService } from 'src/app/core/service/gestionRdv/rdv.service';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-gestion-rdv',
  templateUrl: './gestion-rdv.component.html',
  styleUrls: [],
  providers: [DatePipe]
})
export class GestionRdvComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>()
  date = new Date()
  gestionRdvs: GestionRdv[] = []
  timelines: GestionRdv[] = []
  gestionRdv: GestionRdv
  totalElement: number = 10
  isLoading: boolean = true
  isUpdate: boolean = false
  isAdd: boolean = false
  isHaveOne: boolean = false
  page: number = 0
  size: number = 10


  constructor(
    private authService: AuthService,
    private rdvService: RdvService,
    private datePipe: DatePipe,
    private store: Store<any>,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.isHaveOnePermission()
  }

  handle(selector, $event?) {
    switch (selector) {
      case 'close':
        this.close.emit($event)
        break

      case "getInStore":
        this.store.subscribe(state => {
          this.totalElement = state.entityCache.GestionRdv.totalElements
          this.isLoading = state.entityCache.GestionRdv.loading
        })
        break
      case 'getAll':
        let query = {
          dateRdv: String(this.datePipe.transform(this.date, 'yyyy-MM-dd')),
          page: String(this.page),
          size: String(this.size)
        }
        this.rdvService
          .getWithQuery({ ...query })
          .subscribe(
            success => {
              this.gestionRdvs = success
              this.timelines = this.removeByDate(success)
              this.handle('getInStore')

            },
            failed => this.message.error(failed.status)
          )
        break

      case 'add':
        this.isAdd = $event
        if (!this.isAdd) this.handle('getAll')
        break
    }
  }

  removeByDate(items: GestionRdv[]): GestionRdv[] {
    let date = new Date()
    items = items.filter(
      item => {
        return this.datePipe.transform(item.dateRdv, 'yyyy-MM-dd hh:mm') > this.datePipe.transform(date, 'yyyy-MM-dd hh:mm')
      }
    )
    return items
  }

  onChange(result: Date): void {
    this.date = result
    if (result !== null) this.handle('getAll')
  }

  isHavePermission($event): boolean {
    return this.authService.isHaveRole($event)
  }

  isHaveOnePermission() {
    if (this.authService.isHaveRole('ROLE_RDV_UPDATE')) {
      this.isHaveOne = true
    }

    if (this.authService.isHaveRole('ROLE_RDV_DELETE')) {
      this.isHaveOne = true
    }
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    this.size = params.pageSize
    this.page = params.pageIndex - 1
    this.isLoading = false
    this.handle('getAll')
  }
}
