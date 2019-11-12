import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input()
  type: string = ''

  @Output()
  hideMessageEvent = new EventEmitter()

  constructor() { }

  hide() {
    this.hideMessageEvent.emit()
  }
  ngOnInit() {
  }

}
