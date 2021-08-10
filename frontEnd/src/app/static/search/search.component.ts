import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: []
})
export class SearchComponent implements OnInit {
  @Input() placeholder: string
  @Output() data = new EventEmitter<string>()

  search: string = ""

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.data.emit(this.search)
  }

}
