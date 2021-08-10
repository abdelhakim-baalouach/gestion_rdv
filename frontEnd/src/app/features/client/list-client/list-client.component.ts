import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription } from 'rxjs';
import { Client } from 'src/app/core/model/client/client.model';
import { Pagination } from 'src/app/core/model/_helper/_helper.model';
import { AuthService } from 'src/app/core/service/authentification/auth.service';
import { ClientService } from 'src/app/core/service/client/client.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: []
})
export class ListClientComponent implements OnInit {
  @Input() events: Observable<void>

  private eventsSubscription: Subscription
  clients: Client[] = []
  client: Client
  totalElement: number = 10
  isLoading: boolean = true
  isUpdate: boolean = false
  isHaveOne: boolean = false
  page: number = 0
  size: number = 10

  constructor(
    private authService: AuthService,
    private clientService: ClientService,
    private store: Store<any>,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.isHaveOnePermission()
    this.eventsSubscription = this.events.subscribe(() => {
      this.isLoading = false
      this.handle('getClients')
    })
  }

  handle(selector, $event?, $data?) {
    switch (selector) {
      case "isUpdate":
        this.isUpdate = $event
        this.client = $data
        if (!$event) {
          this.isLoading = false
          this.handle('getClients')
        }
        break

      case "getInStore":
        this.store.subscribe(state => {
          this.totalElement = state.entityCache.Client.totalElements
          this.isLoading = state.entityCache.Client.loading
        })
        break

      case "getClients":
        let query = {
          page: String(this.page),
          size: String(this.size)
        }
        this.clientService
          .getWithQuery(query)
          .subscribe(
            (success) => {
              this.clients = success
              this.handle('getInStore')
            },
            (failed) => this.message.error(failed.error)
          )
        break

      case "deleteClient":
        this.clientService
          .delete($event)
          .subscribe(
            () => {
              this.message.success("Le client a été supprimé avec succès")
              this.isLoading = false
              this.handle('getClients')
            },
            (failed) => this.message.error(failed.error)
          )
        break

      case "search":
        const search = {
          nomContact: $event,
          page: String(this.page),
          size: String(this.size)
        }
        this.clientService
          .getWithQuery({ ...search })
          .subscribe(
            (success) => {
              console.log(success);
              this.clients = success
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
    if (this.authService.isHaveRole('ROLE_CLIENT_UPDATE')) {
      this.isHaveOne = true
    }

    if (this.authService.isHaveRole('ROLE_CLIENT_DELETE')) {
      this.isHaveOne = true
    }
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    this.size = params.pageSize
    this.page = params.pageIndex - 1
    this.isLoading = false
    this.handle('getClients')
  }

  getNextPage() {
    this.page++
    this.isLoading = false
    this.handle('getClients')
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
