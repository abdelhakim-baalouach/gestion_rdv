import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  @Input() isAdd: boolean
  @Output() close = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  handle(selector, $event) {
    switch (selector) {
      case 'close':
        this.close.emit($event)
        break
    }
  }
}
