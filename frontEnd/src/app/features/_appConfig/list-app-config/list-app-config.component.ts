import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription } from 'rxjs';
import { AppConfig, TypeEnum } from 'src/app/core/model/appConfig/appConfig.model';
import { AppConfigRole } from 'src/app/core/model/_helper/_helper.model';
import { AppConfigService } from 'src/app/core/service/appConfig/app-config.service';
import { AuthService } from 'src/app/core/service/authentification/auth.service';

@Component({
  selector: 'app-list-app-config',
  templateUrl: './list-app-config.component.html',
  styleUrls: []
})
export class ListAppConfigComponent implements OnInit {
  @Input() events: Observable<void>
  @Input() typeEnum: TypeEnum
  @Input() roles: AppConfigRole

  private eventsSubscription: Subscription
  appConfigs: AppConfig[] = []
  appConfig: AppConfig

  totalElement: number = 10
  isLoading: boolean = true
  isUpdate: boolean = false
  isHaveOne: boolean = false
  page: number = 0
  size: number = 10

  constructor(
    private authService: AuthService,
    private appConfigService: AppConfigService,
    private store: Store<any>,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.isHaveOnePermission()
    this.eventsSubscription = this.events.subscribe(() => {
      this.isLoading = false
      this.handle('getAll')
    })
  }

  handle(selector, $event?, $data?) {
    switch (selector) {
      case "isUpdate":
        this.isUpdate = $event
        this.appConfig = $data
        if (!$event) {
          this.isLoading = false
          this.handle('getAll')
        }
        break

      case "getInStore":
        this.store.subscribe(state => {
          this.totalElement = state.entityCache.AppConfig.totalElements
          this.isLoading = state.entityCache.AppConfig.loading
        })
        break

      case "getAll":
        let query = {
          typeEnum: this.typeEnum,
          page: String(this.page),
          size: String(this.size)
        }
        this.appConfigService
          .getWithQuery(query)
          .subscribe(
            (success) => {
              this.appConfigs = success
              this.handle('getInStore')
            },
            (failed) => this.message.error(failed.error)
          )
        break

      case "delete":
        this.appConfigService
          .delete($event)
          .subscribe(
            () => {
              this.message.success("La suppression a été effectuée avec succès")
              this.isLoading = false
              this.handle('getAll')
            },
            (failed) => this.message.error(failed.error)
          )
        break

      case "search":
        const search = {
          typeEnum: this.typeEnum,
          nom: $event,
          page: String(0),
          size: String(this.size)
        }
        this.appConfigService
          .getWithQuery({ ...search })
          .subscribe(
            (success) => {
              this.appConfigs = success
              this.handle('getInStore')
            },
            (failed) => this.message.error(failed.error)
          )
        break
    }
  }

  isHavePermission($event): boolean {
    return this.authService.isHaveRole($event)
  }

  isHaveOnePermission() {
    if (this.authService.isHaveRole(this.roles.update)) {
      this.isHaveOne = true
    }

    if (this.authService.isHaveRole(this.roles.delete)) {
      this.isHaveOne = true
    }
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    this.size = params.pageSize
    this.page = params.pageIndex - 1
    this.isLoading = false
    this.handle('getAll')
  }

  /*getNextPage() {
    this.page++
    this.isLoading = false
    this.handle('getAll')
  }*/

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
