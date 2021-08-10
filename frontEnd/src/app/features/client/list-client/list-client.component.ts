import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription } from 'rxjs';
import { Client } from 'src/app/core/model/client/client.model';
import { Items, Pagination } from 'src/app/core/model/_helper/_helper.model';
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
  items: Items = { totalElement: 0, isLoading: true }
  isUpdate: boolean = false

  pagination: Pagination = { page: 0, size: 10 }

  constructor(
    private clientService: ClientService,
    private store: Store<any>,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => {
      this.items.isLoading = false
      this.handle('getClients')
    })
  }

  handle(selector, $event?, $data?) {
    switch (selector) {
      case "isUpdate":
        this.isUpdate = $event
        this.client = $data
        if (!$event) {
          this.items.isLoading = false
          this.handle('getClients')
        }
        break

      case "getInStore":
        this.store.subscribe(state => {
          this.items = {
            totalElement: state.entityCache.Client.totalElements,
            isLoading: state.entityCache.Client.loading
          }
        })
        break

      case "getClients":
        let query = {
          page: String(this.pagination.page),
          size: String(this.pagination.size)
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
              this.items.isLoading = false
              this.handle('getClients')
            },
            (failed) => this.message.error(failed.error)
          )
        break
    }
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    this.pagination.size = params.pageSize
    this.pagination.page = params.pageIndex - 1
    this.items.isLoading = false
    this.handle('getClients')
  }

  getNextPage() {
    this.pagination.page++
    this.items.isLoading = false
    this.handle('getClients')
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
