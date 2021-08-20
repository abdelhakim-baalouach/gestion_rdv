import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthGuardService } from 'src/app/core/service/authentification/auth-guard.service';
import { AuthService } from 'src/app/core/service/authentification/auth.service';

@Component({
  selector: 'app-block-header',
  templateUrl: './block-header.component.html',
  styleUrls: []
})
export class BlockHeaderComponent implements OnInit {
  @Input() title: string
  @Input() roleName: string
  @Input() currentPage: string
  @Output() open = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  isHavePermission($event): boolean {
    return this.authService.isHaveRole($event)
  }
}
