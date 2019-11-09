import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tr[app-row-item]',
  templateUrl: './row-item.component.html',
  styleUrls: ['./row-item.component.scss']
})
export class RowItemComponent implements OnInit {

  Object = Object;

  @Input()
  item: Object;

  constructor() { }

  ngOnInit() {
  }

}
