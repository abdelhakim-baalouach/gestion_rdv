import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription } from 'rxjs';
import { setState, User } from 'src/app/core/model/user/user.model';
import { AuthService } from 'src/app/core/service/authentification/auth.service';
import { UserService } from 'src/app/core/service/user/user.service';

@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: []
})
export class ListUtilisateurComponent implements OnInit {
  @Input() events: Observable<void>
  private eventsSubscription: Subscription

  users: User[] = []
  user: User
  totalElement: number = 10
  isLoading: boolean = true
  isUpdate: boolean = false
  isHaveOne: boolean = false
  page: number = 0
  size: number = 10

  constructor(
    private authService: AuthService,
    private userService: UserService,
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
        this.user = $data
        if (!$event) {
          this.isLoading = false
          this.handle('getAll')
        }
        break

      case "getInStore":
        this.store.subscribe(state => {
          this.totalElement = state.entityCache.User.totalElements
          this.isLoading = state.entityCache.User.loading
        })
        break

      case "getAll":
        let query = {
          page: String(this.page),
          size: String(this.size)
        }
        this.userService
          .getWithQuery(query)
          .subscribe(
            (success) => {
              this.users = success
              this.handle('getInStore')
            },
            (failed) => this.message.error(failed.error)
          )
        break

      case "setStatus":
        const state: setState = {
          id: $event.id,
          status: $data
        }
        this.userService
          .setStatus(state)
          .subscribe(
            () => {
              if ($data == "DEACTIVE") {
                this.message.success("L'utilisater a été désactivé avec succès")
              } else {
                this.message.success("L'utilisater a été activé avec succès")
              }
              this.isLoading = false
              this.handle('getAll')
            },
            (failed) => this.message.error(failed.error)
          )
        break

      case "search":
        const search = {
          username: $event,
          page: String(this.page),
          size: String(this.size)
        }
        this.userService
          .getWithQuery({ ...search })
          .subscribe(
            (success) => {
              this.users = success
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
    if (this.authService.isHaveRole('ROLE_USER_UPDATE')) {
      this.isHaveOne = true
    }

    if (this.authService.isHaveRole('ROLE_USER_STATUS')) {
      this.isHaveOne = true
    }
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    this.size = params.pageSize
    this.page = params.pageIndex - 1
    this.isLoading = false
    this.handle('getAll')
  }

  getNextPage() {
    this.page++
    this.isLoading = false
    this.handle('getAll')
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
