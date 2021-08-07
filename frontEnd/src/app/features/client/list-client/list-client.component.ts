import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Client } from 'src/app/core/model/client/client.model';
import { Pagination } from 'src/app/core/model/_helper/_helper.model';
import { ClientService } from 'src/app/core/service/client/client.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  clients: Client[] = []
  totalElement: number = 0
  isLoading: boolean = true

  pagination: Pagination

  data = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  constructor(
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
  }

  handle(selector, $event?) {
    switch (selector) {
      case "getClients":
        this.clientService
          .getWithQuery({ ...this.pagination.toString })
          .subscribe(
            (success) => console.log(success),
            (failed) => console.log(failed.error)
          )
        break;

      default:
        break;
    }
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    this.pagination.size = params.pageSize
    this.pagination.page = params.pageIndex - 1
  }

  getNextPage() {
    this.pagination.page++
  }
}
