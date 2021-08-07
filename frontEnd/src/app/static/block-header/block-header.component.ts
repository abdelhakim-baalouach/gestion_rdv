import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-block-header',
  templateUrl: './block-header.component.html',
  styleUrls: ['./block-header.component.css']
})
export class BlockHeaderComponent implements OnInit {
  @Input() title: string
  @Input() currentPage: string
  @Output() open = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
