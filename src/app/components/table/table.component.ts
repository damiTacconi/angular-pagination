import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { PaginatorSettings } from 'src/app/models/paginator-settings';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  Object = Object;

  @Input()
  paginatorSettings: PaginatorSettings;

  @Input()
  items = new Array();

  @Output()
  changePageEvent = new EventEmitter<number>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['paginatorSettings']) {
      this.paginatorSettings = changes.paginatorSettings.currentValue;
    } else if (changes['items']) {
      this.items = changes.items.currentValue;
    }
  }

  changePage(page: number) {

    this.changePageEvent.emit(page);
  }

  ngOnInit() {

  }

}
